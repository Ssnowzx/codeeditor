import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PracticePage from "./pages/practice";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Navigate to="/practice" replace />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
