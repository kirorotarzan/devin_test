
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Article } from "../../types";
import { formatDistanceToNow } from "date-fns";

interface ArticleCardProps {
  article: Article;
  onEdit?: (article: Article) => void;
  onDelete?: (articleId: string) => void;
}

export function ArticleCard({ article, onEdit, onDelete }: ArticleCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>
          {formatDistanceToNow(article.createdAt, { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {article.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        <div className="line-clamp-3">{article.content}</div>
        
        {article.urls && article.urls.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Links:</h4>
            <ul className="space-y-1">
              {article.urls.map((url, index) => (
                <li key={index}>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm truncate block"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={() => onEdit(article)}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button variant="destructive" size="sm" onClick={() => onDelete(article.id)}>
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
