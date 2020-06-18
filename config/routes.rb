Rails.application.routes.draw do
  resources :maps
  get 'maps/index'
  root 'maps#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
