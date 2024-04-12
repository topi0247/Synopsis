# frozen_string_literal: true

class Users::SessionsController < DeviseTokenAuth::SessionsController
  # sessionなどの不要なパラメータが入ってしまうのでラップを無効化
  wrap_parameters false

  protected

  # ログイン成功時の処理オーバーライド
  def render_create_success
    render json: {
      success: true,
      user: { name: @resource.name, id: @resource.id },
    }
  end

  def resource_name
    :user
  end
end
