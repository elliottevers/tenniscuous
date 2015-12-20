class Api::SessionsController < ApplicationController

  def create
    p params
    p params[:user][:username]
    p params[:user][:password]
    @user = User.find_by_credentials(
              params[:user][:username],
              params[:user][:password]
            )

    p @user
    p User.find(11)
    p BCrypt::Password.create("1732050808")
    p BCrypt::Password.create(1732050808)
    if @user.nil?
      render nothing: true, status: :unauthorized
    else
      @user.update_attribute(:position, params[:user][:position])
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
