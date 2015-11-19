class User < ActiveRecord::Base

  attr_reader :password

  has_many :conversations, :foreign_key => :sender_id

  after_initialize :ensure_session_token, :init_fields

  validates :session_token, presence: true, uniqueness: true

  validates :username, presence: true, uniqueness: true

  validates :password_digest, presence: true

  validates(
    :password,
    length: { minimum: 6, allow_nil: true }
  )

  def they_accepted_you?(user_id)
    User.find(user_id)[:accepted_users].include?(self[:id])
  end

  def add_to_seen_users(user_id)
    self.update_attributes(seen_users: self[:seen_users] << user_id)
  end

  def add_to_accepted_users(user_id)
    self.update_attributes(seen_users: self[:seen_users] << user_id, accepted_users: self[:accepted_users] << user_id)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def init_fields
    self.profile_description ||= ""
    self.profile_picture_url ||= "http://res.cloudinary.com/dax4cembx/image/upload/v1447899856/default_user_profile_oogfwm.png"
    self.gender ||= ""
    self.genders_sought ||= []
    self.rating ||= 1.0
    self.ratings_sought ||= [1,7]
    self.discovery_radius ||= 25
    self.num_displayed_messages ||= 10
    self.accepted_users ||= []
    self.seen_users ||= []
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
