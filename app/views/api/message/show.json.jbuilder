json.conversation_id @conversation.id
json.other_user_id @self.interlocutor(@conversation)[:id]
json.other_user_username @self.interlocutor(@conversation)[:username]
json.other_user_profile_picture_url @self.interlocutor(@conversation)[:profile_picture_url]
json.current_user_id @current_user.id
json.current_user_username @current_user.username
json.current_user_profile_picture_url @current_user.profile_picture_url
json.messages @messages.last(@num_messages.to_i)
