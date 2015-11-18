# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  professional_players = [{
    username: "Roger Federer",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445667886/vc9vqt6liyfvgak7yp4z.jpg",
    password_digest: BCrypt::Password.create("Roger Federer"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "Well, the flags a big plus.",
    gender: "Male",
    genders_sought: ["Men's Singles","Men's Doubles"],
    rating: 7.0,
    ratings_sought: [3.0, 7.0],
    position: [0, 0],
    discovery_radius: 50,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Rafael Nadal",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445717904/v1h5cqsrq7txzwqfg4l2.jpg",
    password_digest: BCrypt::Password.create("Rafael Nadal"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles"],
    rating: 6.5,
    ratings_sought: [1.0, 7.0],
    position: [37.781824,-122.433014],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Novak Djokovic",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445718433/pagmwd4e5qjfe3vl0lfx.jpg",
    password_digest: BCrypt::Password.create("Novak Djokovic"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0, 7.0],
    position: [37.761487,-122.387695],
    discovery_radius: 3,
    accepted_users: [1],
    seen_users: [1],
  }, {
    username: "Andy Murray",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841273/andy_murray_f94lfq.jpg",
    password_digest: BCrypt::Password.create("Andy Murray"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [37.770969,-122.471466],
    discovery_radius: 3,
    accepted_users: [1],
    seen_users: [1],
  }, {
    username: "Stanislas Wawrinka",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841309/stanislas_wawrinka_h9gi5a.jpg",
    password_digest: BCrypt::Password.create("Stanislas Wawrinka"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [37.869687,-122.287445],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: [],
  }, {
    username: "Tomas Berdych",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841300/tomas_berdych_gsioo0.jpg",
    password_digest: BCrypt::Password.create("Tomas Berdych"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [37.800273,-122.270966],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: [],
  }, {
    username: "Richard Gasquet",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841295/richard_gasquet_xofhha.jpg",
    password_digest: BCrypt::Password.create("Richard Gasquet"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [37.927375,-122.099304],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: [],
  }, {
    username: "Marin Cilic",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841285/marin_cilic_aztmvh.jpg",
    password_digest: BCrypt::Password.create("Marin Cilic"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [37.423872,-122.154236],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: [],
  }, {
    username: "Grigor Dimitrov",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841275/grigor_dimitrov_m5erdl.jpg",
    password_digest: BCrypt::Password.create("Grigor Dimitrov"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [37.361681,-122.058105],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: [],
  }, {
    username: "Kei Nishikori",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841265/kei_nishikori_h6wxf4.jpg",
    password_digest: BCrypt::Password.create("Kei Nishikori"),
    session_token: SecureRandom.urlsafe_base64(16),
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [37.344215,-121.89743],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: [],
  }]

  User.create!(professional_players)

  test_players = []
  (1..25).each do |index|
    random_like = Random.rand(1..3)
    player = {
      username: "user#{index}",
      profile_picture_url: Faker::Avatar.image,
      password_digest: BCrypt::Password.create("user#{index}"),
      gender: ["Male","Female"].sample,
      genders_sought: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles","Mixed Doubles"].shuffle.drop(2),
      rating: Random.rand(2..14)/2,
      ratings_sought: [Random.rand(2..14)/2, Random.rand(2..14)/2].sort,
      position: [37.760367,-122.450867],
      discovery_radius: 25,
      accepted_users: [random_like],
      seen_users: [random_like]
    }
    test_players << player
  end
  (26..50).each do |index|
    random_like = Random.rand(1..3)
    player = {
      username: "user#{index}",
      profile_picture_url: Faker::Avatar.image,
      password_digest: BCrypt::Password.create("user#{index}"),
      gender: ["Male","Female"].sample,
      genders_sought: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles","Mixed Doubles"].shuffle.drop(2),
      rating: Random.rand(2..14)/2,
      ratings_sought: [Random.rand(2..14)/2, Random.rand(2..14)/2].sort,
      position: [46.5958,-112.0270],
      discovery_radius: 50,
      accepted_users: [random_like],
      seen_users: [random_like]
    }
    test_players << player
  end
  User.create!(test_players)
end
