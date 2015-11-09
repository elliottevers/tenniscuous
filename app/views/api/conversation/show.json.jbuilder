json.conversation_id @conversation[:id]
json.other_user_id @self.interlocutor(@conversation)[:id]
json.other_user_username @self.interlocutor(@conversation)[:username]
json.other_user_profile_picture_url @self.interlocutor(@conversation)[:profile_picture_url]
json.messages @messages do |message|
  json.conversation_id  message.conversation_id
  json.user_id  message.user_id
  json.body  message.body
end