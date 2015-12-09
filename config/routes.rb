Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy, :new]
    resources :users
    resources :conversations, defaults: {format: :json} do
      resources :messages
    end

  end

end
