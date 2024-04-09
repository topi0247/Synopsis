# frozen_string_literal: true

class Users::RegistrationsController < DeviseTokenAuth::RegistrationsController
  wrap_parameters false

  def create
    super do |resource|
      if resource.persisted?
        if resource.active_for_authentication?
          # 自動ログイン
          sign_in(resource_name, resource)
          # 認証トークンとユーザー情報を含むJSONを返す
          render json: {
            status: 'success',
            data:   {
              id: resource.id,
              name: resource.name,
            },
            message: "登録が完了しました。", # カスタムメッセージ等
          } and return
        else
          # アカウントがまだ有効でない場合の処理
          render json: { status: 'error', message: "アカウントが有効ではありません。" } and return
        end
      else
        # ユーザーの保存に失敗した場合
        render json: { status: 'error', message: resource.errors.full_messages } and return
      end
    end
  end

  private

  def sign_up_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
