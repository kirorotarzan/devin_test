# Portfolio App

A Notion-like portfolio website for showcasing your projects, articles, and work. Built with modern web technologies, this application allows you to create, manage, and search through your portfolio items with ease.

## 🌟 Features

### Content Management
- **Article Creation**: Create rich articles with text, images, and URLs
- **Image Upload**: Seamlessly upload images via Cloudinary integration
- **URL Embedding**: Add multiple URLs to your articles for reference
- **CRUD Operations**: Create, read, update, and delete your portfolio items

### User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Search Functionality**: Quickly find articles by title, content, or tags
- **Intuitive UI**: Clean, modern interface inspired by Notion
- **Real-time Updates**: Changes reflect immediately in the UI

### Technical Features
- **Firebase Integration**: Secure and scalable data storage with Firestore
- **Cloudinary Integration**: Efficient image hosting and management
- **TypeScript Support**: Type-safe code for better development experience
- **Component-Based Architecture**: Modular and maintainable codebase

## 🚀 Live Demo

Visit the live application: [Portfolio App](https://notion-fork-website-36z0c4tl.devinapps.com)

## 🛠️ Technology Stack

### Frontend
- **React**: UI library for building component-based interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Vite**: Next-generation frontend tooling for fast development
- **Shadcn/UI**: High-quality UI components built with Radix UI and Tailwind CSS
- **React Router**: Declarative routing for React applications

### Backend & Storage
- **Firebase Firestore**: NoSQL database for storing article data
- **Firebase Authentication**: (Optional) User authentication system
- **Cloudinary**: Cloud-based image management solution

### Deployment
- **GitHub**: Version control and code hosting
- **Vercel**: Platform for frontend deployment and hosting

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or later)
- npm or yarn package manager
- Firebase project
- Cloudinary account

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kirorotarzan/devin_test.git
   cd devin_test
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:
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

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📱 Usage Guide

### Creating an Article
1. Click the "Create New Article" button on the home page
2. Fill in the title and content fields
3. Upload an image (optional)
4. Add URLs (optional)
5. Click "Create" to save your article

### Editing an Article
1. Find the article you want to edit in the article list
2. Click the "Edit" button on the article card
3. Make your changes in the form
4. Click "Update" to save your changes

### Searching for Articles
1. Use the search bar at the top of the article list
2. Type keywords related to the article title, content, or tags
3. Results will filter in real-time as you type

### Deleting an Article
1. Find the article you want to delete in the article list
2. Click the "Delete" button on the article card
3. Confirm the deletion when prompted

## 🧩 Project Structure

```
portfolio-app/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── portfolio/       # Portfolio-specific components
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleForm.tsx
│   │   │   └── ArticleList.tsx
│   │   └── ui/              # UI components from shadcn/ui
│   ├── firebase/            # Firebase configuration and services
│   │   ├── config.ts
│   │   └── articleService.ts
│   ├── hooks/               # Custom React hooks
│   │   └── use-mobile.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts
│   │   └── cloudinary.d.ts
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## 🔍 API Reference

### Firebase Article Service

```typescript
// Get all articles
getArticles(): Promise<Article[]>

// Get a single article by ID
getArticle(id: string): Promise<Article | null>

// Create a new article
createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>

// Update an existing article
updateArticle(id: string, article: Partial<Omit<Article, 'id' | 'createdAt'>>): Promise<void>

// Delete an article
deleteArticle(id: string): Promise<void>
```

### Cloudinary Image Upload

The application uses Cloudinary's upload API for image management:

```typescript
// Upload an image to Cloudinary
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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

If you have any questions or feedback, please reach out to the repository owner.

---

Built with ❤️ using React, TypeScript, Firebase, and Cloudinary.
