# frozen_string_literal: true

class Api::V1::Users::SessionsController < DeviseTokenAuth::SessionsController
  def create
    super
  end

  def destroy
    super
  end
end
