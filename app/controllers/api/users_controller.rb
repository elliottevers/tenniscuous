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
    @has_new_match = false
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
          @has_new_match = true
          @current_user_id = current_user.id
          @other_user_id = last_user_id.to_i
        end
        render ('api/user/show.json.jbuilder')
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

    users_positions.each do |user|
      haversine_arguments = [current_user[:position][0], current_user[:position][1]]
      haversine_arguments << user[:position][0]
      haversine_arguments << user[:position][1]
      users_distances[user[:id]] = haversine_arguments
    end

    users_distances.keys.each do |key|
      users_distances[key] = Haversine.distance(*users_distances[key]).to_miles
    end

    filtered_users_distances = users_distances.select do |key, value|
      value < current_user[:discovery_radius]
    end


    filtered_users = filtered_users_distances.keys.map do |key|
      User.find(key)
    end

    filtered_users_by_rating = filtered_users.select do |user|
      (user[:rating] >= current_user[:ratings_sought][0]) && (user[:rating] <= current_user[:ratings_sought][1])
    end

    logger.debug filtered_users_by_rating.map{|u| u[:genders_sought]  }

    filtered_users_by_genders_sought = filtered_users_by_rating.select do |user|
      if current_user[:gender] == "Male"
        user[:genders_sought].include?("Men's Singles") || user[:genders_sought].include?("Men's Doubles") || user[:genders_sought].include?("Mixed Doubles")
      elsif current_user[:gender] == "Female"
        user[:genders_sought].include?("Wommen's Singles") || user[:genders_sought].include?("Women's Doubles") || user[:genders_sought].include?("Mixed Doubles")
      end
    end

    filtered_users_identifiers = filtered_users_by_genders_sought.map do |user|
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

    filtered_by_previously_seen

    render json: filtered_by_previously_seen

  end


  private

  def user_params
    params.require(:user).permit(:username, :password, :id, :profile_description, :gender, {:genders_sought => []}, :rating, {:ratings_sought => []}, {:position => []}, :discovery_radius, :profile_picture_url, :last_seen_user, :last_accepted_user)
  end
end
