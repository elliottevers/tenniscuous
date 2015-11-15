class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user.nil?
      render nothing: true, status: :unauthorized
    else
      @user.update_attribute(:position, params[:user][:position])
      login_user!(@user)
      render ("api/session/create.json.jbuilder")
    end
  end

  def destroy
    user = {
      :id => current_user[:id],
      :username => current_user[:username],
      :profile_picture_url => current_user[:profile_picture_url]
    }
    logout_user!
    render json: user
  end

end
