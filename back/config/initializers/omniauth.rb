Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'],
          {# このURLはGoogle Cloud PlatformのOAuth同意画面で設定したものと一致している必要がある
            redirect_uri: "http://localhost:3000/auth/google_oauth2/callback",
          }
  OmniAuth.config.allowed_request_methods = [:post, :get]
end