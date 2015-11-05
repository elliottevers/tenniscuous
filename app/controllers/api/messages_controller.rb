class Api::MessagesController < ApplicationController
  # before_filter :authenticate_user!

  def create
    logger.debug params
    @conversation = Conversation.find(params[:conversation_id])
    @message = Message.create(:body => params[:body], :conversation_id => params[:conversation_id], :user_id => current_user.id)
    # @message = Message.new
    # @message.body = params[:body]
    # @message.conversation_id = params[:conversation_id]
    # @message.user_id = current_user.id
    # @message.save!

    render json: @message

    # @path = conversation_path(@conversation)
  end

end
