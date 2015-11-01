class Api::UsersController < ApplicationController
  # before_action :require_no_user!

  def create

    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      render json: @user.id
    else
      #this always invokes error callback
      render json: "username or password is invalid"
    end

  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])


    if @user
      @user.update(user_params)
      render json: @user
    else
      render json: { message: 'not found', status: 404}
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

    filtered_users_identifiers = filtered_users.map do |user|
      {
        :id => user.id,
        :username => user.username,
        :picture => user.profile_picture_url
      }
    end

    render json: filtered_users_identifiers

  end


  private

  def user_params
    params.require(:user).permit(:username, :password, :id, :profile_description, :gender, {:genders_sought => []}, :rating, {:ratings_sought => []}, :position, :discovery_radius, :profile_picture_url)
  end
end
