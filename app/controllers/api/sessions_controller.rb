class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      session_params[:username],
      session_params[:password]
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
    render nothing: true, status: :unauthorized
  end

  private

  def session_params
    params.require(:user).permit(:password, :username)
  end
end
