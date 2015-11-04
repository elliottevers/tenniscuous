class Api::ConversationsController < ApplicationController


  def create
    if Conversation.between(params[:sender_id],params[:recipient_id]).present?
      @conversation = Conversation.between(params[:sender_id],params[:recipient_id]).first
    else
      @conversation = Conversation.create!(conversation_params)
    end

    render json: { conversation_id: @conversation.id }
  end

  def show
    @conversation = Conversation.find(params[:id])
    @reciever = interlocutor(@conversation)
    @messages = @conversation.messages
    @message = Message.new
    @self = self
    render ('api/conversation/show.json.jbuilder')
  end

  def destroy
  end

  def index
    @conversations = Conversation.involving(current_user.id)
    @self = self
    render ('api/conversation/index.json.jbuilder')
  end

  def interlocutor(conversation)
    current_user == conversation.recipient ? conversation.sender : conversation.recipient
  end

  private

  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end


end
