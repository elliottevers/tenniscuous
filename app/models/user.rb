class User < ActiveRecord::Base
  attr_reader :password

  after_initialize :ensure_session_token, :init_fields

  validates :session_token, presence: true, uniqueness: true

  validates :username, presence: true, uniqueness: true

  validates :password_digest, presence: true

  validates(
    :password,
    length: { minimum: 6, allow_nil: true }
  )

  has_many :conversations, :foreign_key => :sender_id

  def add_to_matches(user_id)
    self.update_attributes(matches: self[:matches] << user_id)
    logger.debug "MY ID IS #{self[:id]}"
    logger.debug "MATCHES #{self[:matches]}"
  end

  def they_accepted_you?(user_id)
    User.find(user_id)[:accepted_users].include?(self[:id])
  end

  def add_to_seen_users(user_id)
    self.update_attributes(seen_users: self[:seen_users] << user_id)
    logger.debug "SEEN USERS #{self[:seen_users]}"
  end

  def add_to_accepted_users(user_id)
    self.update_attributes(seen_users: self[:seen_users] << user_id, accepted_users: self[:accepted_users] << user_id)
    logger.debug "ACCEPTED USERS #{self[:accepted_users]}"
    logger.debug "SEEN USERS #{self[:seen_users]}"
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
    self.gender ||= ""
    self.genders_sought ||= []
    self.rating ||= nil
    self.ratings_sought ||= []
    self.discovery_radius ||= 25
    self.num_displayed_messages ||= 10
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
