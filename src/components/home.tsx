import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">C Programming Practice</h1>
        <Button size="lg" onClick={() => navigate("/practice")}>
          Start Practice
        </Button>
      </div>
    </div>
  );
}

export default Home;
