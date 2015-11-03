class Conversation < ActiveRecord::Base
  belongs_to :sender, :foreign_key => :sender_id, class_name: 'User'
  belongs_to :recipient, :foreign_key => :recipient_id, class_name: 'User'

  has_many :messages, dependent: :destroy

  validates_uniqueness_of :sender_id, :scope => :recipient_id

  scope :involving, -> (user_id) do
    where("conversations.sender_id =? OR conversations.recipient_id =?",user_id,user_id)
  end

  scope :between, -> (sender_id,recipient_id) do
    where("(conversations.sender_id = ? AND conversations.recipient_id =?) OR (conversations.sender_id = ? AND conversations.recipient_id =?)", sender_id,recipient_id, recipient_id, sender_id)
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
