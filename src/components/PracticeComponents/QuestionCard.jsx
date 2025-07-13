
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function QuestionCard({ question }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/practice/${question.id}`);
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-1">{question.title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {question.description}
        </p>
        <Button onClick={handleClick}>Practice</Button>
      </CardContent>
    </Card>
  );
}
