Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  # deviseの設定
  # セッションと登録のルーティングはdevise_token_authでやるのでスキップ
  # devise_for :users, skip: [:sessions, :registrations], controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  # devise-token-authの設定
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    # /auth/sign_in, /auth/sign_out
    sessions: 'users/sessions',
    # /auth/sign_up
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
    end
  end
end