# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151010022715) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "users", force: :cascade do |t|
    t.string   "username",                       null: false
    t.string   "password_digest",            null: false
    t.string   "session_token",              null: false
    t.text     "profile_description"
    t.string   "gender"
    t.string   "genders_sought", array: true
    t.float   "rating"
    t.float   "ratings_sought", array: true
    t.float   "position", array: true
    t.integer  "discovery_radius"
    t.integer "accepted_users", array: true
    # t.integer "last_accepted_user"
    t.integer "seen_users", array: true
    # t.integer "last_seen_user"
    t.string   "profile_picture_url"
    t.integer "num_displayed_messages"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true
  add_index "users", ["password_digest"], name: "index_users_on_password_digest"

  create_table "conversations", force: true do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "conversations", ["recipient_id"], name: "index_conversations_on_recipient_id"
  add_index "conversations", ["sender_id"], name: "index_conversations_on_sender_id"

  create_table "messages", force: true do |t|
    t.text     "body"
    t.integer  "conversation_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "messages", ["conversation_id"], name: "index_messages_on_conversation_id"
  add_index "messages", ["user_id"], name: "index_messages_on_user_id"




end
