# frozen_string_literal: true

class Users::SessionsController < DeviseTokenAuth::SessionsController
  def create
    super
  end

  def destroy
    super
  end
end
