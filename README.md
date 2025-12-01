# react_sns

### 概要
- Reactの学習用にSNSを開発しました。
### 使用技術
- フロントエンド：React / Next.js / TypeScript / Tailwind CSS
- バックエンド: Go / Gin
- インフラ：
  - AWS ECS Fargate / ECR / ALB / lightsail / Route53
  - Docker
  - terraform
- CI:
  - Github Actions
- 認証: Auth0
### 主な機能
- ユーザー新規作成/ログイン(Auth0)
- 投稿機能
- フォロー機能
- コメント・いいね機能
- ログイン状態で閲覧/機能制限
- ユーザープロフィール編集
- 無限スクロール(react-virtualizedで画面に表示する部分のみ都度読み込む)
- ダークモード切り替え

### デプロイ環境
- URL: https://www.dadadada.work

### テスト
- フロントエンド：vitest + React Testing Library

### 工夫した点
- Redux Toolkit を使った状態管理
- 認証情報をセッションに保持
- フロント単体テスト
- AWS環境構築、Fargateにデプロイ([terraform](https://github.com/jiiiigdreeees26/public_terraform_for_sns)で構築)
- HTTPS化
- Github Actionでdevelopにプルリク適用後にECRプッシュ
- 5000件の投稿テストデータでパフォーマンス確認

### Getting Started

実行環境:
- Ubuntu-24.04
- Docker version 28.3.3

任意の作業用ディレクトリで下記コマンドを実行
```
git clone https://github.com/jiiiigdreeees26/public_react_sns.git
cd react_sns/
sh setup_docker.sh
sh setup_yarn.sh
```
Auth0の秘匿情報を環境変数.env.localに設定すること(Auth0のダッシュボードから確認)
```
NEXT_PUBLIC_AUTH0_CLIENT_ID=クライアントID
NEXT_PUBLIC_AUTH0_CLIENT_SECRET=クライアントシークレット
NEXT_PUBLIC_AUTH0_ISSUER=Auth0ドメイン
NEXT_PUBLIC_NEXTAUTH_SECRET="openssl rand -base64 32"で生成した値
```
コンテナ上で起動
`docker-compose up`
すると、http://localhost:3000 にアクセスしてアプリケーションを操作できます。





### 手動ECRプッシュ手順(Github Actions設定済み)
#### aws cliでログイン
##### (ログインできなかったら`aws configure`でアクセスキーとシークレットキーの設定をすること)
```
環境変数を定義
REGION=us-east-1
IMAGE=my-react-app
VERSION=デプロイ対象となる最新コミットのハッシュ頭文字7字
USER_ID=
```
`aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${USER_ID}.dkr.ecr.${REGION}.amazonaws.com`
#### docker build
`docker build -f dockerfile.prod -t ${IMAGE}:${VERSION} .`
#### タグつけ
`docker tag ${IMAGE}:${VERSION} ${USER_ID}.dkr.ecr.${REGION}.amazonaws.com/${IMAGE}:${VERSION}`
#### プッシュ
`docker push ${USER_ID}.dkr.ecr.${REGION}.amazonaws.com/${IMAGE}:${VERSION}`

### 構成図
![](./aws.drawio.svg)
### 関連リポジトリ
[terraform](https://github.com/jiiiigdreeees26/public_terraform_for_sns)
[Go API](https://github.com/jiiiigdreeees26/public_go_sns_api)