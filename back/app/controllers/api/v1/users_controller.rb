class Api::V1::UsersController < Api::V1::BasesController
  def current_user
    Rails.logger.debug("current_user", current_user)
    render json: "test"
  end
end
