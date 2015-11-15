class Api::MessagesController < ApplicationController
  before_action :require_user!

  def create

    if params[:numMessages]
      num_messages = params[:numMessages]
    else
      num_messages = 10
    end

    @message = Message.create(:body => params[:body], :conversation_id => params[:conversation_id], :user_id => current_user.id)
    @conversation = Conversation.find(params[:conversation_id])
    @messages = @conversation.messages

    new_conversation = {
      :conversation_id => @conversation[:id],
      :other_user_id => interlocutor(@conversation)[:id],
      :other_user_username => interlocutor(@conversation)[:username],
      :other_user_profile_picture_url => interlocutor(@conversation)[:profile_picture_url]
    }

    new_messages = @messages.map do |message|
      {:conversation_id => message[:conversation_id],
       :user_id => message[:user_id],
       :body => message[:body]
      }
    end

    new_conversation[:messages] = new_messages.last(num_messages.to_i)
    new_conversation[:current_user_id] = current_user[:id]
    new_conversation[:current_user_username] = current_user[:username]
    new_conversation[:current_user_profile_picture_url] = current_user[:profile_picture_url]

    @conversation = new_conversation

    render json: @conversation
  end

end
