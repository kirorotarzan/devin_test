# ポートフォリオアプリ

プロジェクト、記事、作品を紹介するためのNotionライクなポートフォリオウェブサイトです。最新のWeb技術で構築されており、ポートフォリオアイテムの作成、管理、検索を簡単に行うことができます。

## 🌟 機能

### コンテンツ管理
- **記事作成**: テキスト、画像、URLを含む豊かな記事を作成
- **画像アップロード**: Cloudinary連携によるシームレスな画像アップロード
- **URL埋め込み**: 参照用に記事に複数のURLを追加
- **CRUD操作**: ポートフォリオアイテムの作成、読み取り、更新、削除

### ユーザーエクスペリエンス
- **レスポンシブデザイン**: デスクトップとモバイルデバイスで動作
- **検索機能**: タイトル、コンテンツ、タグで記事をすばやく検索
- **直感的なUI**: Notionにインスパイアされたクリーンでモダンなインターフェース
- **リアルタイム更新**: 変更がUIにすぐに反映

### 技術的特徴
- **Firebase連携**: Firestoreによる安全でスケーラブルなデータストレージ
- **Cloudinary連携**: 効率的な画像ホスティングと管理
- **TypeScriptサポート**: より良い開発体験のための型安全なコード
- **コンポーネントベースのアーキテクチャ**: モジュール化され保守性の高いコードベース

## 🚀 ライブデモ

アプリケーションにアクセス: [ポートフォリオアプリ](https://notion-fork-website-36z0c4tl.devinapps.com)

## 🛠️ 技術スタック

### フロントエンド
- **React**: コンポーネントベースのインターフェースを構築するためのUIライブラリ
- **TypeScript**: より良い開発者体験のための型付きJavaScript
- **Vite**: 高速な開発のための次世代フロントエンドツール
- **Shadcn/UI**: Radix UIとTailwind CSSで構築された高品質UIコンポーネント
- **React Router**: Reactアプリケーションの宣言的ルーティング

### バックエンド＆ストレージ
- **Firebase Firestore**: 記事データを保存するためのNoSQLデータベース
- **Firebase Authentication**: （オプション）ユーザー認証システム
- **Cloudinary**: クラウドベースの画像管理ソリューション

### デプロイ
- **GitHub**: バージョン管理とコードホスティング
- **Vercel**: フロントエンドのデプロイとホスティングのためのプラットフォーム

## 📋 前提条件

始める前に、以下を確認してください：
- Node.js（v16以降）
- npmまたはyarnパッケージマネージャー
- Firebaseプロジェクト
- Cloudinaryアカウント

## 🔧 インストール＆セットアップ

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/kirorotarzan/devin_test.git
   cd devin_test
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   # または
   yarn install
   ```

3. **環境変数の設定**
   ルートディレクトリに`.env`ファイルを作成し、以下の変数を設定します：
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_API_KEY=your-api-key
   VITE_CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   # または
   yarn dev
   ```

5. **本番用ビルド**
   ```bash
   npm run build
   # または
   yarn build
   ```

## 📱 使用ガイド

### 記事の作成
1. ホームページの「Create New Article」ボタンをクリック
2. タイトルとコンテンツフィールドに入力
3. 画像をアップロード（オプション）
4. URLを追加（オプション）
5. 「Create」をクリックして記事を保存

### 記事の編集
1. 記事リストから編集したい記事を見つける
2. 記事カードの「Edit」ボタンをクリック
3. フォームで変更を加える
4. 「Update」をクリックして変更を保存

### 記事の検索
1. 記事リストの上部にある検索バーを使用
2. 記事のタイトル、コンテンツ、またはタグに関連するキーワードを入力
3. 入力に応じてリアルタイムで結果がフィルタリングされる

### 記事の削除
1. 記事リストから削除したい記事を見つける
2. 記事カードの「Delete」ボタンをクリック
3. 確認メッセージが表示されたら削除を確認

## 🧩 プロジェクト構造

```
portfolio-app/
├── public/                  # 静的アセット
├── src/
│   ├── components/
│   │   ├── portfolio/       # ポートフォリオ固有のコンポーネント
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleForm.tsx
│   │   │   └── ArticleList.tsx
│   │   └── ui/              # shadcn/uiのUIコンポーネント
│   ├── firebase/            # Firebase設定とサービス
│   │   ├── config.ts
│   │   └── articleService.ts
│   ├── hooks/               # カスタムReactフック
│   │   └── use-mobile.ts
│   ├── types/               # TypeScript型定義
│   │   ├── index.ts
│   │   └── cloudinary.d.ts
│   ├── App.tsx              # メインアプリケーションコンポーネント
│   └── main.tsx             # アプリケーションエントリーポイント
├── .env                     # 環境変数
├── package.json             # プロジェクト依存関係とスクリプト
└── tsconfig.json            # TypeScript設定
```

## 🔍 APIリファレンス

### Firebase記事サービス

```typescript
// すべての記事を取得
getArticles(): Promise<Article[]>

// IDで単一の記事を取得
getArticle(id: string): Promise<Article | null>

// 新しい記事を作成
createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>

// 既存の記事を更新
updateArticle(id: string, article: Partial<Omit<Article, 'id' | 'createdAt'>>): Promise<void>

// 記事を削除
deleteArticle(id: string): Promise<void>
```

### Cloudinary画像アップロード

アプリケーションはCloudinaryのアップロードAPIを画像管理に使用しています：

```typescript
// Cloudinaryに画像をアップロード
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'portfolio_uploads');
  
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  
  const data = await response.json();
  return data.secure_url;
};
```

## 🤝 貢献

貢献は歓迎します！プルリクエストを自由に提出してください。

1. リポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを開く

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細はLICENSEファイルを参照してください。

## 📞 連絡先

質問やフィードバックがある場合は、リポジトリの所有者にお問い合わせください。

---

React、TypeScript、Firebase、Cloudinaryを使用して❤️で構築されました。
