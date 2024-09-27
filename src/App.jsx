import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./store";
import Home from "../src/Pages/Home";
import Login from "../src/Pages/Login";
import Game from "../src/Pages/Game";

// const ProtectedRoute = ({ element }) => {
//   const { isAuthenticated } = useAuthStore();
//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

const App = () => {
  return (
    <main className="min-h-screen w-full flex bg-[#000] text-white overflow-hidden">
      {/* <Routes>
        <Route path="/login/:gameId" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/game/:gameId"
          element={<ProtectedRoute element={<Game />} />}
        />
      </Routes> */}
      <Routes>
        <Route path="/login/:gameId" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </main>
  );
};

export default App;
