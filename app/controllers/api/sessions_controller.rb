class Api::SessionsController < ApplicationController

  def create
    p params
    p session_params
    p session_params[:username]
    p session_params[:password]
    @user = User.find_by_credentials(session_params)
    if @user.nil?
      p "user was nil"
      p @user.errors
      render nothing: true, status: :unauthorized
    else
      @user.update_attribute(:position, params[:user][:position])
      p @user.errors
      login_user!(@user)
      render ("api/session/create.json.jbuilder")
    end
  end

  def destroy
    logout_user!
    render nothing: true, status: :unauthorized
  end

  private

  def session_params
    params.require(:user).permit(:password, :username, {:position => []})
  end
end
