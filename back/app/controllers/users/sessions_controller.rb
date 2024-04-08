# frozen_string_literal: true

class Users::SessionsController < DeviseTokenAuth::SessionsController
  def create
    super
  end

  def destroy
    super
  end

  def current_user
    render json: current_user.as_json
  end
end
