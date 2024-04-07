class Users::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  # skip_before_action :verify_authenticity_token, only: :google_oauth2

  # def google_oauth2

  #   Rails.logger.info "==========================="
  #   Rails.logger.info request.env['omniauth.auth']
  #   render json: request.env['omniauth.auth']
  #   # user = User.from_omniauth(request.env["omniauth.auth"])

  #   # if user.persisted?
  #   #   redirect_to "#{ENV['FRONT_URL']}/tasks", allow_other_host: true
  #   # else
  #   #   session["devise.google_data"] = request.env["omniauth.auth"]
  #   # end
  # end

  def omniauth_success
    render json: requests
  end

  protected

  def handle_new_resource
    @oauth_registration = true
    # set_random_password
  end
end