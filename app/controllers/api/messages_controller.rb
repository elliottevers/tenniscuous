class Api::MessagesController < ApplicationController
  before_action :require_user!

  def create

    if message_params[:numMessages]
      @num_messages = message_params[:numMessages]
    else
      @num_messages = 10
    end

    Message.create(
      :body => message_params[:body],
      :conversation_id => message_params[:conversation_id],
      :user_id => current_user.id
    )

    @conversation = Conversation.find(
      message_params[:conversation_id]
    )
    @messages = @conversation.messages
    @current_user = current_user
    @self = self

    render ('api/message/show.json.jbuilder')
  end

  private

  def message_params
    params.permit(:num_messages, :body, :conversation_id, :user_id)
  end

end
