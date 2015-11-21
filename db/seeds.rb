# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

ActiveRecord::Base.transaction do
  professional_players = [{
    username: "Roger",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445667886/vc9vqt6liyfvgak7yp4z.jpg",
    password_digest: BCrypt::Password.create("Roger Federer"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "The best thing about being from Switzerland? Well, the flags a big plus.",
    gender: "Male",
    genders_sought: ["Men's Singles","Men's Doubles", "Mixed Doubles"],
    rating: 7.0,
    ratings_sought: [1.0, 7.0],
    position: [47.5667, 7.6000],
    discovery_radius: 50,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Rafael",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445717904/v1h5cqsrq7txzwqfg4l2.jpg",
    password_digest: BCrypt::Password.create("Rafael Nadal"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "I think that every major should be made into a clay court tournament",
    gender: "Male",
    genders_sought: ["Men's Singles"],
    rating: 6.5,
    ratings_sought: [1.0, 7.0],
    position: [40.4333,-3.7000],
    discovery_radius: 20,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Novak",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445718433/pagmwd4e5qjfe3vl0lfx.jpg",
    password_digest: BCrypt::Password.create("Novak Djokovic"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "*rips shirt off in celebration*",
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0, 7.0],
    position: [44.8000,20.4667],
    discovery_radius: 40,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Andy",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841273/andy_murray_f94lfq.jpg",
    password_digest: BCrypt::Password.create("Andy Murray"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "Some say my face looks like it's being put to sleep by voice",
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [55.9500,-3.1833],
    discovery_radius: 10,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Stanislas",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841309/stanislas_wawrinka_h9gi5a.jpg",
    password_digest: BCrypt::Password.create("Stanislas Wawrinka"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
    gender: "Male",
    genders_sought: ["Men's Singles","Men's Doubles"],
    rating: 6.5,
    ratings_sought: [1.0,7.0],
    position: [46.8333,8.3333],
    discovery_radius: 45,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Jerzy",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1447971052/Jerzy-Janowicz-008_dsdeyg.jpg",
    password_digest: BCrypt::Password.create("Jerzy Boy"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "HOW MANY TIMES?!?",
    gender: "Male",
    genders_sought: ["Men's Singles"],
    rating: 6.0,
    ratings_sought: [1.0,7.0],
    position: [52.2167,21.0333],
    discovery_radius: 25,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Richard",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841295/richard_gasquet_xofhha.jpg",
    password_digest: BCrypt::Password.create("Richard Gasquet"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "We should just take my backhand technique... and push it to my forehand technique",
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.0,
    ratings_sought: [1.0,7.0],
    position: [47.0000,2.0000],
    discovery_radius: 35,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Alexandr",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1447898575/Alexandr-Dolgopolov-Getty-images1_aq8k4w.jpg",
    password_digest: BCrypt::Password.create("Alexandr Dolgopolov"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "I have devilish good looks and a big return of serve to back it up.",
    gender: "Male",
    genders_sought: ["Men's Singles","Men's Doubles"],
    rating: 6.0,
    ratings_sought: [1.0,7.0],
    position: [49.0000,32.0000],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Grigor",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1445841275/grigor_dimitrov_m5erdl.jpg",
    password_digest: BCrypt::Password.create("Grigor Dimitrov"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "Hello - can I get you any tweeners?",
    gender: "Male",
    genders_sought: ["Men's Singles","Mixed Doubles"],
    rating: 6.0,
    ratings_sought: [1.0,7.0],
    position: [42.7500,25.5000],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: []
  }, {
    username: "Gael",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1447898564/monfils_jiawjf.jpg",
    password_digest: BCrypt::Password.create("Gael Monfils"),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "An easy put-a-way volley?  Better do a 360 jump smash",
    gender: "Male",
    genders_sought: ["Men's Singles"],
    rating: 6.0,
    ratings_sought: [1.0,7.0],
    position: [47.0000,2.0000],
    discovery_radius: 3,
    accepted_users: [],
    seen_users: []
  }]

  # test_players = []
  # (1..25).each do |index|
  #   random_like = Random.rand(1..3)
  #   player = {
  #     username: "user#{index}",
  #     profile_picture_url: Faker::Avatar.image,
  #     password_digest: BCrypt::Password.create("user#{index}"),
  #     gender: ["Male","Female"].sample,
  #     genders_sought: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles","Mixed Doubles"].shuffle.drop(2),
  #     rating: Random.rand(2..14)/2,
  #     ratings_sought: [Random.rand(2..14)/2, Random.rand(2..14)/2].sort,
  #     position: [37.760367,-122.450867],
  #     discovery_radius: 25,
  #     accepted_users: [random_like],
  #     seen_users: [random_like]
  #   }
  #   test_players << player
  # end
  # (26..50).each do |index|
  #   random_like = Random.rand(1..3)
  #   player = {
  #     username: "user#{index}",
  #     profile_picture_url: Faker::Avatar.image,
  #     password_digest: BCrypt::Password.create("user#{index}"),
  #     gender: ["Male","Female"].sample,
  #     genders_sought: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles","Mixed Doubles"].shuffle.drop(2),
  #     rating: Random.rand(2..14)/2,
  #     ratings_sought: [Random.rand(2..14)/2, Random.rand(2..14)/2].sort,
  #     position: [46.5958,-112.0270],
  #     discovery_radius: 50,
  #     accepted_users: [random_like],
  #     seen_users: [random_like]
  #   }
  #   test_players << player
  # end

  ceo = {
    username: "Elliott",
    profile_picture_url: "http://res.cloudinary.com/dax4cembx/image/upload/v1447891989/p1423821489-3_fwxccn.jpg",
    password_digest: BCrypt::Password.create(ENV['CEO_PASSWORD']),
    session_token: SecureRandom.urlsafe_base64(16),
    profile_description: "Hey! I built Tenniscuous.  I live in Silicon Valley but I'll hit with you whenever you stop by.  Also, if you are on a desktop computer try resizing the browser to a smaller width!",
    gender: "Male",
    genders_sought: ["Men's Singles","Men's Doubles","Mixed Doubles"],
    rating: 4.0,
    ratings_sought: [1.0,7.0],
    position: [37.7691,-122.4449],
    discovery_radius: 50,
    accepted_users: [],
    seen_users: []
  }

  professional_players << ceo

  User.create!(professional_players)
end
