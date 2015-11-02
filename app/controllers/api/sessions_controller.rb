class Api::SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      render json: "Your username or password is incorrect"
    else
      user.update_attribute(:position, params[:user][:position])
      login_user!(user)
      render json: user
    end
  end

  def destroy
    logout_user!
    render json: {message: "You have been logged out"}
  end

end
