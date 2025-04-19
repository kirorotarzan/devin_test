
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Article } from "../../types";
import { ArticleCard } from "./ArticleCard";

interface ArticleListProps {
  articles: Article[];
  onEdit?: (article: Article) => void;
  onDelete?: (articleId: string) => void;
}

export function ArticleList({ articles, onEdit, onDelete }: ArticleListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10 bg-white dark:bg-zinc-950 py-2">
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zinc-500">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
