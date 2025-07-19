import { toast } from "react-hot-toast";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function QuestionCard({ question, index }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const email = localStorage.getItem("email");
    if (email === "guest@codespace.com") {
      toast.error(
        <>
          Please{" "}
          <a href="/login" className="underline text-blue-300 hover:text-blue-500">
            Login
          </a>{" "}
          or{" "}
          <a href="/" className="underline text-blue-300 hover:text-blue-500">
            Sign Up
          </a>{" "}
          to access this feature.
        </>
      );
      return;
    }

    navigate(`/practice/${question._id}`);
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-3 flex items-center justify-between">
        <h2 className="text-base font-medium">
          {index + 1}. {question.title}
        </h2>
        <Button size="sm" onClick={handleClick}>
          Practice
        </Button>
      </CardContent>
    </Card>
  );
}
