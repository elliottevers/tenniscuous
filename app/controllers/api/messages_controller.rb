class Api::MessagesController < ApplicationController
  # before_filter :authenticate_user!

  def create
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

    new_conversation[:messages] = new_messages
    @conversation = new_conversation
    render json: @conversation

    # render ('api/message/create.js.erb')

    # json.conversation_id @conversation[:id]
    # json.other_user_id @self.interlocutor(@conversation)[:id]
    # json.other_user_username @self.interlocutor(@conversation)[:username]
    # json.other_user_profile_picture_url @self.interlocutor(@conversation)[:profile_picture_url]
    # json.messages @messages do |message|
    #   json.conversation_id  message.conversation_id
    #   json.user_id  message.user_id
    #   json.body  message.body
    # end
    # PrivatePub.publish_to("/api/messages/new", :conversation => new_conversation)

    # @path = conversation_path(@conversation)
  end

end
