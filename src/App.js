import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
