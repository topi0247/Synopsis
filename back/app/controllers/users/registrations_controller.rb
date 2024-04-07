# frozen_string_literal: true

class Users::RegistrationsController < DeviseTokenAuth::RegistrationsController

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
              role: resource.role,
            },
            message: "登録が完了しました。", # カスタムメッセージ等
          } and return
        else
          # アカウントがまだ有効でない場合の処理
          render json: { status: 'error', message: "アカウントが有効ではありません。" } and return
        end
      else
        # ユーザーの保存に失敗した場合
        render json: { status: 'error', message: resource.errors.full_messages.join(', ') } and return
      end
    end
    # # ユーザーを登録
    # build_resource(sign_up_params)
    # resource.save

    # # ブロックが渡されていれば、リソースを返す
    # yield resource if block_given?

    # # DBに登録されたかどうか
    # if resource.persisted?
    #   # ユーザーが認証可能な場合
    #   if resource.active_for_authentication?
    #     # ログインしてトークンを発行
    #     sign_up(resource_name, resource)
    #     # リダイレクト
    #     redirect_to ENV['FRONT_URL']+'/tasks',allow_other_host: true and return
    #   else
    #     # ユーザーが認証可能でない場合、セッションデータをクリア
    #     expire_data_after_sign_in!
    #     render json: {
    #       data: resource.as_json
    #     }
    #   end
    # else
    #   # ユーザーの保存が失敗した場合、パスワードをクリア
    #   clean_up_passwords resource
    #   # パスワードの最小文字数を設定
    #   set_minimum_password_length
    #   # ユーザー情報を返す
    #   render json: {
    #     data: resource.as_json
    #   }
    # end
  end

  def update
    super
  end

  def destroy
    super
  end

  def sign_up_params
    params.require(:registration).permit(:name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:registration).permit(:name, :email)
  end
end
