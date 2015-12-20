class Api::SessionsController < ApplicationController

  def create
    p "session params"
    p params
    @user = User.find_by_credentials(
              session_params[:username],
              session_params[:password]
            )
    if @user.nil?
      render nothing: true, status: :unauthorized
    else
      @user.update_attribute(:position, params[:user][:position])
      login_user!(@user)
      p "current user"
      p current_user
      p current_user.id
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
