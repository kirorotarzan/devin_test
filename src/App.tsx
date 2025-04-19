import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger } from './components/ui/sidebar';
import { ArticleList } from './components/portfolio/ArticleList';
import { ArticleForm } from './components/portfolio/ArticleForm';
import { Article } from './types';
import { getArticles, createArticle, updateArticle, deleteArticle } from './firebase/articleService';
import './App.css';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleCreateArticle = async (articleData: Partial<Article>) => {
    try {
      setLoading(true);
      await createArticle(articleData as Omit<Article, 'id' | 'createdAt' | 'updatedAt'>);
      
      const updatedArticles = await getArticles();
      setArticles(updatedArticles);
      
      setIsCreating(false);
      setError(null);
    } catch (err) {
      console.error('Error creating article:', err);
      setError('Failed to create article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateArticle = async (articleData: Partial<Article>) => {
    if (!articleData.id) return;
    
    try {
      setLoading(true);
      await updateArticle(articleData.id, articleData);
      
      const updatedArticles = await getArticles();
      setArticles(updatedArticles);
      
      setEditingArticle(null);
      setError(null);
    } catch (err) {
      console.error('Error updating article:', err);
      setError('Failed to update article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      setLoading(true);
      await deleteArticle(articleId);
      
      setArticles(articles.filter(article => article.id !== articleId));
      setError(null);
    } catch (err) {
      console.error('Error deleting article:', err);
      setError('Failed to delete article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <SidebarProvider>
        <div className="flex h-screen">
          <Sidebar>
            <SidebarHeader>
              <h1 className="text-xl font-bold px-4 py-2">Portfolio App</h1>
            </SidebarHeader>
            <SidebarContent>
              <nav className="space-y-1 px-2">
                <Link to="/" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  Home
                </Link>
                <Link to="/create" className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  Create Article
                </Link>
              </nav>
            </SidebarContent>
            <SidebarFooter>
              <div className="px-4 py-2 text-sm text-zinc-500">
                © {new Date().getFullYear()} Portfolio App
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 overflow-auto p-6">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Portfolio Articles</h1>
                <SidebarTrigger />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <Routes>
                <Route 
                  path="/" 
                  element={
                    <>
                      <div className="mb-4">
                        <Button onClick={() => setIsCreating(true)}>Create New Article</Button>
                      </div>
                      
                      {loading && <p>Loading articles...</p>}
                      
                      {!loading && articles.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-zinc-500 mb-4">No articles yet. Create your first one!</p>
                          <Button onClick={() => setIsCreating(true)}>Create Article</Button>
                        </div>
                      )}
                      
                      {!loading && articles.length > 0 && (
                        <ArticleList 
                          articles={articles} 
                          onEdit={setEditingArticle} 
                          onDelete={handleDeleteArticle} 
                        />
                      )}
                      
                      {isCreating && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                          <div className="bg-white dark:bg-zinc-900 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
                            <div className="p-6">
                              <ArticleForm 
                                onSubmit={handleCreateArticle} 
                                onCancel={() => setIsCreating(false)} 
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {editingArticle && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                          <div className="bg-white dark:bg-zinc-900 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
                            <div className="p-6">
                              <ArticleForm 
                                initialArticle={editingArticle} 
                                onSubmit={handleUpdateArticle} 
                                onCancel={() => setEditingArticle(null)} 
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  } 
                />
                <Route 
                  path="/create" 
                  element={
                    <ArticleForm 
                      onSubmit={handleCreateArticle} 
                      onCancel={() => window.history.back()} 
                    />
                  } 
                />
              </Routes>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;
