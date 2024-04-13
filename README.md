# 環境構築方法
1. クローンかフォーク
2. `docker-compose build`
3. `docker-compose up`
4. 必要あればコンテナ起動後に下記を実行
```bash
$ docker-compose exec back bash
$ bundle install
```
```bash
$ docker-compose exec front bash
$ yarn install
```

## バックエンド
backディレクトリに`.env`作成
下記を記入
```
FRONT_URL=http://localhost:8000
HOST_DOMAIN=localhost:3000
```
## フロントエンド
frontディレクトリに`env.local`を作成
下記を記入
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_VERSION=v1
```

## Google認証
1. GCPにアクセス
2. 新しいプロジェクト作成
3. 新しいプロジェクトを作成後、「APIとサービス」をクリック
4. 左カラムから「認証情報」クリック
5. 「認証情報を作成」から「OAuthクライアントID」を作成
6. アプリケーションの種類：ウェブアプリケーション
名前：何でも良い
承認済みJavaScript生成元：`http://localhost:3000`
承認済みのリダイレクト URI：`http://localhost:3000/omniauth/google_oauth2/callback`
作成
7. クライアントIDとクライアントシークレットが発行されるので、コピっとく
8. OAuth同意画面で色々設定（無記入でも動く）して保存して次へ
9. スコープで「メールアドレスの参照」「個人情報の表示」の2つ（上2つ）を選択し保存して次へ
10. テストユーザー追加（テストで使う自分のアカウント）して保存して次へ、で終わり

## Discord認証
1. [Discord developers](https://discord.com/developers/applications)にアクセス（アカウント作成したりなんだりかんだり）
2. 「New Application」でアプリ名を設定しアプリを作成
3. 左カラムから「OAuth2」のページへ行く
4. 「CLIENT ID」と「CLIENT SERCRET」をコピっとく（CLIENT SERCRETは表示されなければ再生成する）
5. Redirectsに`http://localhost:3000/omniauth/discord/callback`

## credentialsに取得したキーの設定
gem`dotenv-rails`をつかってenvファイルを使うやり方だと、envファイルの読み込み順が安定しないのか「シークレットキーがない」と怒られるのでcredentialsに設定するやり方でやっています
1. コンテナに入る `docker-compose exec back bash`
2. `apt-get update && apt-get install -y vim`でvimを入れる（nanoでも可）
3. `EDITOR="vi" rails credentials:edit -e development`で開発環境のcredentialsを編集
4. 下記を追加
```yaml
google:
  client_id: 先ほどコピーしたGoogleのクライアントID
  client_secret: 先ほどコピーしたGoogleのクライアントシークレット

discord:
  client_id: 先ほどコピーしたDiscordのクライアントID
  client_secret: 先ほどコピーしたDiscordのシークレットキー
  callback_url: http://localhost:3000/auth/discord/callback
```
5. 保存して閉じる（`:wq`）


### 補足
`gem "omniauth-rails_csrf_protection"`の利用はまだしていません。やる予定ではあります。<br />
Deviseを使っている関係でOmniAuthの設定の一部を`condig/initializers/devise.rb`に記載していますが、deviseを使わない場合はOmniAuthの初期化ファイル（`config/initializers/omniauth.rb`）に記述で大丈夫だと思います。<br />
```ruby:
# config/initializers/devise.rb
config.omniauth :google_oauth2, Rails.application.credentials.google[:client_id], Rails.application.credentials.google[:client_secret], {
  scope: 'email,profile',
  prompt: 'select_account',
  provider_ignores_state: Rails.env.development?,
}
config.omniauth :discord, Rails.application.credentials.discord[:client_id], Rails.application.credentials.discord[:client_secret], {
  scope: 'email identify',
  callback_url: 'http://localhost:3000/auth/discord/callback', # TODO: 修正案件
  provider_ignores_state: Rails.env.development?,
}
```
deviseを使わない場合は上記を下記に追記で多分いけます、多分
```ruby
# config/initializers/omniauth.rb
Rails.application.config.middleware.use OmniAuth::Builder do
  OmniAuth.config.allowed_request_methods = [:get]
end
```

### 技術スタック
フロント
- Next.js 14
- App Router
- React hook form
- next-inil（i18nのやつ）
- Tailwind CSS
- MaterialUI

バック
- Rails7.1.3 APIモード
- Devise
- DeviseTokenAuth
- OmniAuth (Google, Discord)

インフラ
- Docker
- バック：Heroku（本環境確認はまだ）
- DB：MySQL（本環境確認はまだ）
- フロント：Vercel（動いてるかの確認はまだ）

記述日　2024/04/12 14:11現在