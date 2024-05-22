import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { router } from "./router";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}>
          {router.map((route) => (
            <Route {...route} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}
