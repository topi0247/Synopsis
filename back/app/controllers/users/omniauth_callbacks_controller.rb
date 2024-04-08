class Users::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  include DeviseTokenAuth::Concerns::SetUserByToken

  # オーバーライド
  def redirect_callbacks
    user = User.from_omniauth(request.env['omniauth.auth'])

    if user.persisted?
      sign_in(:user, user, store: false, bypass: false)
      redirect_to "#{ENV['FRONT_URL']}/tasks", allow_other_host: true
    else
      redirect_to "#{ENV['FRONT_URL']}?status=error", allow_other_host: true
    end
  end
end
