Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    # /auth/:provider/callback
    omniauth_callbacks: 'api/v1/users/omniauth_callbacks',
    # /auth/sign_in, /auth/sign_out
    sessions: 'api/v1/users/sessions',
    # /auth/sign_up
    registrations: 'api/v1/users/registrations'
  }
end