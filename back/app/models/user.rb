# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  allow_password_change  :boolean          default(FALSE)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  name                   :string(255)      default(""), not null
#  provider               :string(255)      default("email"), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  tokens                 :json
#  uid                    :string(255)      default(""), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_uid_and_provider      (uid,provider) UNIQUE
#
class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable,
          :omniauthable, omniauth_providers: %i[google_oauth2 discord]
  include DeviseTokenAuth::Concerns::User

  def self.from_omniauth(auth)
    # メールアドレスを取得
    email = auth.info.email

    # 同じメールアドレスのユーザーがいるか確認、いなかったら作る
    # TODO : 複数認証をOKにするなら認証用のテーブルを別途設けたほうがいい
    user = User.find_or_create_by(email: email) do |new_user|
      new_user.provider = auth.provider
      new_user.uid = auth.uid
      # 名前がすでに設定されていたらそちらを使う
      new_user.name = new_user.name.presence || auth.info.name
      # 新規ユーザーにパスワードを設定
      new_user.password = Devise.friendly_token[0, 20] if new_user.new_record?
    end

    user
  end
end
