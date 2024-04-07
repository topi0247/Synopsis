if Rails.env.production?
  Rails.application.config.session_store :cookie_store, key: '_synopsis_auth_token', expire_after: 2.weeks, domain: 'synopsis-2be27f26742b.herokuapp.com'
else
  Rails.application.config.session_store :cookie_store, key: '_synopsis_auth_token', domain: 'localhost'
end
