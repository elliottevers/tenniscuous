json.conversation_id @conversation[:id]
json.other_user_id @receiver[:id]
json.other_user_username @receiver[:username]
json.other_user_profile_picture_url @receiver[:profile_picture_url]
json.current_user_id @sender[:id]
json.current_user_username @sender[:username]
json.current_user_profile_picture_url @sender[:profile_picture_url]
json.messages @conversation.messages.last(@sender[:num_displayed_messages]) do |message|
  json.conversation_id  message.conversation_id
  json.user_id  message.user_id
  json.body  message.body
end
