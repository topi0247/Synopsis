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
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_CALLBACK_URL=http://localhost:3000/auth/discord/callback
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
7. クライアントIDとクライアントシークレットが発行されるので、それぞれbackディレクトリの`env`に追記（クライアントIDは`GOOGLE_CLIENT_ID`に、クライアントシークレットは`GOOGLE_CLIENT_SECRET`に）
8. OAuth同意画面で色々設定（無記入でも動く）して保存して次へ
9. スコープで「メールアドレスの参照」「個人情報の表示」の2つ（上2つ）を選択し保存して次へ
10. テストユーザー追加（テストで使う自分のアカウント）して保存して次へ、で終わり

## Discord認証
1. [Discord developers](https://discord.com/developers/applications)にアクセス（アカウント作成したりなんだりかんだり）
2. 「New Application」でアプリ名を設定しアプリを作成
3. 左カラムから「OAuth2」のページへ行く
4. 「CLIENT ID」と「CLIENT SECRET」（CLIENT SECRETは表示されなければ再生成する）を、それぞれbackディレクトリの`env`に追記（CLIENT IDを`DISCORD_CLIENT_ID`に、CLIENT SECRETを`DISCORD_CLIENT_SECRET`）
5. Redirectsに`http://localhost:3000/omniauth/discord/callback`を追記して保存して終わり


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
- バック：Heroku
- DB：MySQL
- フロント：Vercel

記述日　2024/04/12 14:11現在