import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/write" element={<CreatePost />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      {/* <Footer /> */}
    </UserProvider>
  );
};

export default App;
