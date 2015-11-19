class Api::UsersController < ApplicationController
  before_action :require_user!, :except => :create

  def create
    user = User.new(user_params)

    if user.save
      login_user!(user)
      liked_by_ceo
      @initial_user = {
        :id => current_user[:id],
        :username => current_user[:username],
        :profile_picture_url => current_user[:profile_picture_url]
      }
      render ("api/user/create.json.jbuilder")
    else
      render nothing: true, status: :unauthorized
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
        @user.update(user_params_to_save)
        last_user_id = user_params[:last_seen_user]
        @user.add_to_seen_users(last_user_id)
        render json: @user
      else
        render nothing: true, status: :unauthorized
      end
    elsif (params[:message] == "acceptance")
      if @user
        @user.update(user_params_to_save)
        last_user_id = user_params[:last_accepted_user]
        @user.add_to_accepted_users(last_user_id)
        if @user.they_accepted_you?(last_user_id)
          conversation = Conversation.create(
                          :sender_id => current_user.id,
                          :recipient_id => last_user_id
                        )
          ceo_send_message(conversation)
          @has_new_match = true
          @current_user_id = current_user.id
          @other_user_id = last_user_id.to_i

        end
        render ('api/user/show.json.jbuilder')
      else
        render nothing: true, status: :unauthorized
      end
    else
      if @user
        @user.update(user_params_to_save)
        render json: @user
      else
        render nothing: true, status: :unauthorized
      end
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render nothing: true, status: :unauthorized
  end

  def index

    users_positions = User.where.not(id: current_user.id).map do |user|
      {
        :id => user.id,
        :position => user.position
      }
    end

    distances_from_current_user = Hash.new

    users_positions.each do |user|
      haversine_arguments = [current_user[:position][0], current_user[:position][1]]
      haversine_arguments << user[:position][0]
      haversine_arguments << user[:position][1]
      distances_from_current_user[user[:id]] = haversine_arguments
    end

    distances_from_current_user.keys.each do |key|
      distances_from_current_user[key] = Haversine.distance(*distances_from_current_user[key]).to_miles
    end

    filtered_users_distances = distances_from_current_user.select do |key, value|
      value < current_user[:discovery_radius]
    end

    filtered_users = filtered_users_distances.keys.map do |key|
      User.find(key)
    end

    filtered_users_by_rating = filtered_users.select do |user|
      (user[:rating] >= current_user[:ratings_sought][0]) &&
      (user[:rating] <= current_user[:ratings_sought][1]) &&
      (current_user[:rating] >= user[:ratings_sought][0]) &&
      (current_user[:rating] <= user[:ratings_sought][1])
    end

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

    filtered_users_identifiers = merge_with_seed_users(filtered_users_identifiers)

    this_user = User.find(current_user.id)

    filtered_by_previously_seen = filtered_users_identifiers.reject do |user|
      this_user[:seen_users].include?(user[:id])
    end

    ceo = User.find_by_username("Elliott")

    ceo = {
      :id => ceo.id,
      :username => ceo.username,
      :picture => ceo.profile_picture_url
    }

    unless current_user[:seen_users].include?(ceo[:id])
      filtered_by_previously_seen << ceo
    end

    render json: filtered_by_previously_seen

  end


  private

  def user_params
    params.require(:user).permit(:username, :password, :id, :profile_description, :gender, {:genders_sought => []}, :rating, {:ratings_sought => []}, {:position => []}, :discovery_radius, :profile_picture_url, :last_accepted_user, :last_seen_user)
  end

  def user_params_to_save
    user_params.reject{|key, value| (value == user_params[:last_accepted_user]) || (value == user_params[:last_seen_user])}
  end
end
