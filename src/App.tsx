import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import PracticePage from "./pages/practice";

function App() {
  const location = useLocation();
  const isTempoStoryboard = location.pathname.includes("/tempobook/dynamic/");

  // If it's a Tempo storyboard route, render the practice page directly
  if (isTempoStoryboard) {
    return <PracticePage />;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
