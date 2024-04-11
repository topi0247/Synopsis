Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }

  namespace :api do
    namespace :v1 do
      get 'me', to: 'users#me'
      get 'account', to: 'accounts#show'
    end
  end
end