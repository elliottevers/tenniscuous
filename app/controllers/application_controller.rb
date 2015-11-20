class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  def interlocutor(conversation)
    current_user == conversation.recipient ? conversation.sender : conversation.recipient
  end


  private

  def ceo_send_message(conversation)

    ceo_id = User.find_by_username("Elliott")[:id]

    if (conversation[:sender_id] == ceo_id || conversation[:recipient_id] == ceo_id)
      Message.create!({
        user_id: ceo_id,
        body: "Hey, welcome to Tenniscuous!  Be sure to edit your profile so that you can see others players around you.",
        conversation_id: conversation[:id]
      })
    end
  end

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
      User.find_by_username("Jerzy")
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
