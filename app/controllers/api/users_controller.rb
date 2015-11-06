class Api::UsersController < ApplicationController
  before_action :require_user!, :except => :create

  def create
    user = User.new(user_params)

    if user.save
      login_user!(user)
      @initial_user= {
        :id => current_user[:id],
        :username => current_user[:username],
        :profile_picture_url => current_user[:profile_picture_url]
      }
      render ("api/user/create.json.jbuilder")
    else
      render json: { message: 'not found', status: 404}
    end

  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    if (params[:message] == "rejection")
      if @user
        @user.update(user_params)
        @user.add_to_seen_users(user_params[:last_seen_user])
        render json: @user
      else
        render json: { message: 'not found', status: 404}
      end
    elsif (params[:message] == "acceptance")
      if @user
        @user.update(user_params)
        last_user_id = user_params[:last_accepted_user]
        @user.add_to_accepted_users(last_user_id)
        if @user.they_accepted_you?(last_user_id)
          Conversation.create(
          :sender_id => current_user.id,
          :recipient_id => last_user_id
          )
        end
        render json: @user
      else
        render json: { message: 'not found', status: 404}
      end
    else
      if @user
        @user.update(user_params)
        render json: @user
      else
        render json: { message: 'not found', status: 404}
      end
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: @user
  end

  def index

    users_positions = User.where.not(id: current_user.id).map do |user|
      {
        :id => user.id,
        :position => user.position
      }
    end

    users_distances = Hash.new
    logger.debug current_user[:position]
    users_positions.each do |user|
      haversine_arguments = [current_user[:position][0], current_user[:position][1]]
      haversine_arguments << user[:position][0]
      haversine_arguments << user[:position][1]
      users_distances[user[:id]] = haversine_arguments
    end
    logger.debug users_distances
    users_distances.keys.each do |key|
      users_distances[key] = Haversine.distance(*users_distances[key]).to_miles
    end

    filtered_users_distances = users_distances.select do |key, value|
      value < current_user[:discovery_radius]
    end

    filtered_users = filtered_users_distances.keys.map do |key|
      User.find(key)
    end

    filtered_users_identifiers = filtered_users.map do |user|
      {
        :id => user.id,
        :username => user.username,
        :picture => user.profile_picture_url
      }
    end

    this_user = User.find(current_user.id)
    filtered_by_previously_seen = filtered_users_identifiers.reject do |user|
      this_user[:seen_users].include?(user[:id])
    end

    render json: filtered_by_previously_seen

  end


  private

  def user_params
    params.require(:user).permit(:username, :password, :id, :profile_description, :gender, {:genders_sought => []}, :rating, {:ratings_sought => []}, {:position => []}, :discovery_radius, :profile_picture_url, :last_seen_user, :last_accepted_user)
  end
end
