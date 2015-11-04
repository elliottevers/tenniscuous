json.array!(@conversations) do |conversation|
  json.conversation_id conversation[:id]
  json.other_user_id @self.interlocutor(conversation)[:id]
  json.other_user_username @self.interlocutor(conversation)[:username]
  json.other_user_profile_picture_url @self.interlocutor(conversation)[:profile_picture_url]
end
