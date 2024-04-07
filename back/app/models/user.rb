# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  name                   :string(255)      default(""), not null
#  role                   :integer          default("general"), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  provider               :string(255)      default("email"), not null
#  uid                    :string(255)      default(""), not null
#  allow_password_change  :boolean          default(FALSE)
#  tokens                 :text(65535)
#

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User # DeviseTokenAuthのユーザー機能を追加
  devise :database_authenticatable, # サインイン時にパスワードをハッシュしてDBに保存
        :registerable,              # ユーザーが自分のアカウントを編集及び破棄できる
        :recoverable,               # ユーザーのパスワードをリセットし、リセット指示を送信
        :rememberable,              # 保存されたCookieからユーザーを記憶するためのトークン生成とクリア
        :validatable,               # メアドとパスワード検証を提供
        :omniauthable,              # OmniAuthのサポートを追加
        omniauth_providers: %i[google_oauth2] # OmniAuthのプロバイダーを指定

  enum role: { general: 0, admin: 1 }

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.name = auth.info.name if user.name.blank?
      user.password = Devise.friendly_token[0,20] if user.password.blank?
      user.skip_confirmation!
    end
  end
end

