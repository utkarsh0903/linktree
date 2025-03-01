
import "./App.css";
import Category from "./Pages/category.jsx";
import Dashboard from "./Pages/dashboard.jsx";
import Home from "./Pages/home.jsx";
import Login from "./Pages/login.jsx";
import Register from "./Pages/register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category" element={<Category />} />
      {/* <Route path="*" element={<NoPage />} /> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
