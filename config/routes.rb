Rails.application.routes.draw do
  resources :maps

  get '/api/maps/:id', to: 'maps_api#show'
  post '/api/maps/:id', to: 'maps_api#create'

  root 'maps#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
