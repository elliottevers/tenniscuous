class Api::ConversationsController < ApplicationController

  def create
    conversation = Conversation.between(
      conversation_params[:sender_id],
      conversation_params[:recipient_id]
    )
    if conversation.present?
      conversation = conversation.first
    else
      conversation = Conversation.create!(conversation_params)
    end

    render json: { conversation_id: conversation.id }
  end

  def show
    display_more_messages?

    @conversation = Conversation.find(params[:id])
    @sender = current_user
    @receiver = interlocutor(@conversation)

    render ('api/conversation/show.json.jbuilder')
  end

  def destroy
    conversation = Conversation.find(params[:id]).destroy
    render json: conversation
  end

  def index
    @conversations = Conversation.involving(current_user.id).reverse_order
    @self = self
    render ('api/conversation/index.json.jbuilder')
  end

  private

  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end

  def display_more_messages?
    if params[:loadMoreMessages]
      current_user[:num_displayed_messages] = current_user[:num_displayed_messages] + 10
      current_user.save
    else
      current_user[:num_displayed_messages] = 10
      current_user.save
    end
  end

end
