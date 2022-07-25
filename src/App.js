import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { GlobalProvider } from './context/globalContext'
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import TheatersPage from "./pages/theaters";
import MoviesPage from "./pages/movies";
import ProfilePage from "./pages/profile";
import MovieShow from "./components/MovieShow/MovieShow";
import ShowsPage from "./pages/shows";
import BookingsPage from "./pages/bookings";
import Footer from "./components/Footer/Footer";
import fetchApi from "./utils/fetchApi";

function App() {
  let [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let userId = sessionStorage.getItem("userID");
    let token = sessionStorage.getItem("token");
    let role = sessionStorage.getItem("role");
    userId === null || token === null || role === null ? navigate("/login") : setUserId(userId);
  }, []);

  const onLogin = async (value) => {
    let res = await fetchApi.post("/users/login", { ...value });
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("userID", res.data.userID);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);
      setMessage("");
      navigate("/dashboard");
    } else {
      setMessage(res.data.message);
    }
  };

  return (
    <GlobalProvider value={{onLogin, message, userId}}>
     <>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/theaters" element={<TheatersPage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:id" element={<MovieShow/>}></Route>
          <Route path="/shows" element={<ShowsPage/>}></Route>
          <Route path="/bookings" element={<BookingsPage/>}></Route>
          <Route
            path="/users/profile/:id"
            element={<ProfilePage />}
          ></Route>
          <Route path="/" element={<LoginPage />}></Route>
        </Routes>
      </>
      <div className="container-fluid">
          <Footer/>
      </div>
    </GlobalProvider>
  );
}

export default App;
