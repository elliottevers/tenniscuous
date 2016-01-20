class Api::UsersController < ApplicationController
  before_action :require_user!, :except => :create

  def create
    user = User.new(user_params)
    if user.save
      login_user!(user)
      current_user.liked_by_ceo
      @user_attributes = current_user.attributes
      render ("api/user/create.json.jbuilder")
    else
      error_string = ""
      user.errors.each do |_ , v|
        error_string += v
      end
      render json: {errors: error_string}
    end
  end

  def show
    render json: User.find(params.permit(:id)[:id])
  end

  def update
    user = User.find(user_params[:id])
    user = nil if not_current_user?(user)
    has_new_match = false
    if (params[:message] == "rejection")
      if user
        user.update(save_like_or_dislike)
        last_seen_user = User.find(user_params[:last_seen_user])
        user.add_to_seen_users(last_seen_user)
        render json: user
      else
        render nothing: true, status: :unauthorized
      end
    elsif (params[:message] == "acceptance")
      if user
        user.update(save_like_or_dislike)
        last_accepted_user = User.find(user_params[:last_accepted_user])
        user.add_to_accepted_users(last_accepted_user)
        if user.they_accepted_you?(last_accepted_user)
          conversation = Conversation.create(
                          :sender_id => current_user.id,
                          :recipient_id => last_accepted_user.id
                        )
          has_new_match = true
        end
        render json: { has_new_match: has_new_match,
                       other_user_id: last_accepted_user.id,
                       current_user_id: current_user.id
                     }
      else
        render nothing: true, status: :unauthorized
      end
    else
      if user
        user.update(save_like_or_dislike)
        render json: user.id
      else
        render nothing: true, status: :unauthorized
      end
    end
  end

  def destroy
    user = User.find(params[:id])
    user = nil if not_current_user?(user)
    user.destroy
    render nothing: true, status: :unauthorized
  end

  def index
    render json: current_user.users_in_queue
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :id,
      :profile_description, :gender, {:genders_sought => []},
      :rating, {:ratings_sought => []}, {:position => []},
      :discovery_radius, :profile_picture_url, :last_accepted_user,
      :last_seen_user)
  end

  def save_like_or_dislike
    user_params.reject do |key, value|
      (value == user_params[:last_accepted_user]) ||
      (value == user_params[:last_seen_user])
    end
  end
end
