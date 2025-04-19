import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Article } from "../../types";

interface ArticleFormProps {
  initialArticle?: Partial<Article>;
  onSubmit: (article: Partial<Article>) => void;
  onCancel?: () => void;
}

export function ArticleForm({ initialArticle, onSubmit, onCancel }: ArticleFormProps) {
  const [title, setTitle] = useState(initialArticle?.title || "");
  const [content, setContent] = useState(initialArticle?.content || "");
  const [imageUrl, setImageUrl] = useState(initialArticle?.imageUrl || "");
  const [urls, setUrls] = useState<string[]>(initialArticle?.urls || []);
  const [newUrl, setNewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      imageUrl,
      urls,
      ...(initialArticle?.id ? { id: initialArticle.id } : {}),
    });
  };

  const handleAddUrl = () => {
    if (newUrl && !urls.includes(newUrl)) {
      setUrls([...urls, newUrl]);
      setNewUrl("");
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setUrls(urls.filter(url => url !== urlToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
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
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialArticle?.id ? "Edit Article" : "Create New Article"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content here..."
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Image
            </label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {isUploading && <p className="text-sm text-zinc-500">Uploading...</p>}
            {imageUrl && (
              <div className="mt-2 relative rounded-md overflow-hidden">
                <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setImageUrl("")}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              URLs
            </label>
            <div className="flex gap-2">
              <Input
                id="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Enter URL"
              />
              <Button type="button" onClick={handleAddUrl} disabled={!newUrl}>
                Add
              </Button>
            </div>
            {urls.length > 0 && (
              <ul className="mt-2 space-y-1">
                {urls.map((url, index) => (
                  <li key={index} className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm truncate"
                    >
                      {url}
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveUrl(url)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isUploading || !title || !content}>
            {initialArticle?.id ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
