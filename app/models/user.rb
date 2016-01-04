class User < ActiveRecord::Base

  attr_reader :password

  has_many :conversations, :foreign_key => :sender_id

  after_initialize :ensure_session_token, :init_fields

  validates :session_token, presence: true, uniqueness: true

  validates :username,
            :presence => {message: "You gotta have a username!"},
            :uniqueness => {message: "Pick a different username!"}

  validates :password_digest, presence: true

  validates(
    :password,
    length: { minimum: 6,
              allow_nil: true,
              message: "You gotta have a longer password!"
            }
  )

  def they_accepted_you?(user)
    User.find(user.id).accepted_users.include?(self.id)
  end

  def add_to_seen_users(user)
    self.update_attributes(seen_users: self.seen_users << user.id)
  end

  def add_to_accepted_users(user)
    self.update_attributes(seen_users: self.seen_users << user.id,
      accepted_users: self.accepted_users << user.id
    )
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

  def users_in_queue

    all_other_users = User.where.not(id: self.id)

    users_within_radius = all_other_users.select do |user|
      haversine_arguments = [self.position[0], self.position[1]]
      haversine_arguments << user.position[0]
      haversine_arguments << user.position[1]
      Haversine.distance(*haversine_arguments).to_miles < self.discovery_radius
    end

    filtered_users_by_rating = users_within_radius.select do |user|
      (user.rating >= self.ratings_sought[0]) &&
      (user.rating <= self.ratings_sought[1]) &&
      (self.rating >= user.ratings_sought[0]) &&
      (self.rating <= user.ratings_sought[1])
    end

    filtered_users_by_genders_sought = filtered_users_by_rating.select do |user|
      if self.gender == "Male"
        user.genders_sought.include?("Men's Singles") ||
        user.genders_sought.include?("Men's Doubles") ||
        user.genders_sought.include?("Mixed Doubles")
      elsif self.gender == "Female"
        user.genders_sought.include?("Women's Singles") ||
        user.genders_sought.include?("Women's Doubles") ||
        user.genders_sought.include?("Mixed Doubles")
      end
    end

    including_seeds = merge_with_seed_users(filtered_users_by_genders_sought)

    filtered_by_previously_seen = including_seeds.reject do |user|
      self.seen_users.include?(user.id)
    end

    filtered_by_previously_seen

  end

  def merge_with_seed_users(users)

    seed_users = [
      User.find_by_username("FedExpress"),
      User.find_by_username("DaKingOfClay"),
      User.find_by_username("Braveheart"),
      User.find_by_username("Djoker"),
      User.find_by_username("StanTheMan"),
      User.find_by_username("Grigor"),
      User.find_by_username("Alexandr"),
      User.find_by_username("LaMonf"),
      User.find_by_username("Richard"),
      User.find_by_username("JerzyBoy"),
      User.find_by_username("Elliott")
    ]

    users + seed_users

  end

  def liked_by_ceo
    ceo = User.find_by_username("Elliott")
    ceo.add_to_seen_users(self)
    ceo.add_to_accepted_users(self)
  end

  private

  def init_fields
    self.profile_description ||= "I should really add a description of myself!"
    self.profile_picture_url ||= "http://res.cloudinary.com/dax4cembx/image/upload/v1447899856/default_user_profile_oogfwm.png"
    self.gender ||= ""
    self.genders_sought ||= []
    self.rating ||= 1.0
    self.ratings_sought ||= [1,7]
    self.discovery_radius ||= 50
    self.num_displayed_messages ||= 10
    self.accepted_users ||= []
    self.seen_users ||= []
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
