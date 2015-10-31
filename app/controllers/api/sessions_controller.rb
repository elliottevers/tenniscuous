class Api::SessionsController < ApplicationController
  # before_action :require_no_user!, only: [:create]

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      #this will always invoke error callback
      render json: "user is not in database"
    else
      user.update_attribute(:position, params[:user][:position])
      login_user!(user)
      render json: user
    end
  end

  def destroy
    logout_user!
    render json: {message: "user has been logged out"}
  end

end
