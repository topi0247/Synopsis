class Users::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

  # オーバーライド
  # 後でよく確認する
  def redirect_callbacks
    user = User.from_omniauth(request.env['omniauth.auth'])

    if user.persisted?
      sign_in(:user, user, store: false, bypass: false)
      response_headers(user)
      redirect_to "#{ENV['FRONT_URL']}/ja/tasks", allow_other_host: true
    else
      redirect_to "#{ENV['FRONT_URL']}/?status=error", allow_other_host: true
    end
  end

  private

  def response_headers(user)
    token = user.create_token
    response.headers[:uid] = user.uid
    response.headers['access-token'] = token.token
    response.headers[:client] = token.client
    response.headers[:expiry] = token.expiry
  end
end
