class Users::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

  # オーバーライド
  # 後でよく確認する
  def redirect_callbacks
    user = User.from_omniauth(request.env['omniauth.auth'])

    if user.persisted?
      sign_in(:user, user, store: false, bypass: false)
      token = user.create_token
      user.tokens[token.client] = {
        token: token.token,
        token_hash: token.token_hash,
        expiry: token.expiry
      }
      if user.save
        redirect_to "#{ENV['FRONT_URL']}/ja/tasks?uid=#{user.uid}&token=#{token.token}&client=#{token.client}&expiry=#{token.expiry}", allow_other_host: true
      else
        Rails.logger.error("Failed to save user: #{user.errors.full_messages.join(", ")}")
        redirect_to "#{ENV['FRONT_URL']}/?status=error", allow_other_host: true
      end
    else
      redirect_to "#{ENV['FRONT_URL']}/?status=error", allow_other_host: true
    end
  end
end
