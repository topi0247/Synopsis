class Api::V1::Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # Googleからのレスポンスを処理するメソッド
  def google_oauth2
    # Googleからのレスポンスを処理するメソッド
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: "Google") if is_navigational_format?
    else
      session["devise.google_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end
end