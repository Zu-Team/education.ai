import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage.jsx";
import RoomsPage from "./pages/RoomsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import FriendsChatPage from "./pages/FriendsChatPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import StudyTreePage from "./pages/StudyTreePage";
import VideosPage from './pages/VideosPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<FriendsChatPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="study-tree" element={<StudyTreePage />} />
          <Route index element={<HomePage />} />
        </Route>
        <Route path="*" element={<div>الصفحة غير موجودة</div>} />
      </Routes>
    </Router>
  );
}

export default App;
