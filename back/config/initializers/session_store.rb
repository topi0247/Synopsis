# クロスサイト時に必要な設定
Rails.application.config.session_store :cookie_store, key: '_synopsis_auth_token', same_site: :none, secure: Rails.env.production?, httponly: true