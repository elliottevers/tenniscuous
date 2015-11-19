class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  def interlocutor(conversation)
    current_user == conversation.recipient ? conversation.sender : conversation.recipient
  end


  private

  def liked_by_ceo
    ceo = User.find_by_username("Elliott")
    ceo.add_to_seen_users(current_user[:id])
    ceo.add_to_accepted_users(current_user[:id])
  end

  def merge_with_seed_users(users)
    seed_users = [
      User.find_by_username("Roger"),
      User.find_by_username("Rafael"),
      User.find_by_username("Andy"),
      User.find_by_username("Novak"),
      User.find_by_username("Stanislas"),
      User.find_by_username("Grigor"),
      User.find_by_username("Alexandr"),
      User.find_by_username("Gael"),
      User.find_by_username("Richard"),
      User.find_by_username("Fabio")
    ]
    
    filtered_seed_users = seed_users.map do |user|
      {
        :id => user.id,
        :username => user.username,
        :picture => user.profile_picture_url
      }
    end

    users + filtered_seed_users

  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def login_user!(user)
    logger.debug "logged in user"
    session[:session_token] = user.reset_session_token!
  end

  def logout_user!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_user!
    render nothing: true, status: :unauthorized if current_user.nil?
  end

  def require_no_user!
    render nothing: true, status: :unauthorized unless current_user.nil?
  end
end
