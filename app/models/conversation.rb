class Conversation < ActiveRecord::Base
  after_create :insert_ceo_message

  belongs_to :sender, :foreign_key => :sender_id, class_name: 'User'
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: 'User'
  has_many :messages, dependent: :destroy

  validates_uniqueness_of :sender_id, :scope => :recipient_id

  def self.involving(user_id)
    where("conversations.sender_id =? OR conversations.recipient_id =?",user_id,user_id)
  end

  def self.between(sender_id, recipient_id)
    where(
      "(conversations.sender_id = ? AND conversations.recipient_id =?) OR (conversations.sender_id = ? AND conversations.recipient_id =?)",
      sender_id,
      recipient_id,
      recipient_id,
      sender_id
    )
  end

  def insert_ceo_message
    ceo = User.find_by_username("Elliott")
    if (self.sender_id == ceo.id || self.recipient_id == ceo.id)
      Message.create!({
        user_id: ceo.id,
        body: "Hey, welcome to Tenniscuous!  Be sure to edit your profile so that you can see others players around you.",
        conversation_id: self.id
      })
    end
  end

  def other_user_id
    if self.recipient_id == current_user[:id]
      return self.sender_id
    else
      return self.recipient_id
    end
  end

  def other_user_profile_picture_url
    User.find(other_user_id)[:profile_picture_url]
  end

  def other_user_username
    User.find(other_user_id)[:username]
  end

end
