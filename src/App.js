import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { GlobalProvider } from "./context/globalContext";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import TheatersPage from "./pages/theaters";
import MoviesPage from "./pages/movies";
import ProfilePage from "./pages/profile";
import ShowsPage from "./pages/shows";
import BookingsPage from "./pages/bookings";
import Footer from "./components/Footer/Footer";
import fetchApi from "./utils/fetchApi";
import MoviePage from "./pages/movie";
import MovieShowPage from "./pages/movieshow";
import Layout from "./components/Layout/Layout";
import Seatingpage from "./pages/seating";

const exclusionArray = ["/login", "/signup", "/bookings", "/"];
const layoutExclusionArray = ["/login", "/signup", "/"];
const footerExclusionArray = ["/booktickets"]

function App() {
  let [movies, setMovies] = useState([]);
  let [theaters, setTheaters] = useState([]);
  let [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let userId = sessionStorage.getItem("userID");
    let token = sessionStorage.getItem("token");
    let role = sessionStorage.getItem("role");
    userId === null || token === null || role === null
      ? navigate("/login")
      : setUser({ userId, token, role });
  }, []);

  useEffect(() => {
    if (exclusionArray.indexOf(location.pathname) < 0) {
      getMovie();
      getTheater();
    }
  }, [location.pathname]);

  async function getMovie() {
    let res = await fetchApi.get("/movies");
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      setMovies(res.data.movies);
      //setMessage(res.data.message);
    } else {
      console.log(res.data);
    }
  }

  async function getTheater() {
    let res = await fetchApi.get("/theaters");
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      setTheaters(res.data.theaters);
      //setMessage(res.data.message);
    } else {
      console.log(res.data);
    }
  }

  async function getMovieWithId(id) {
    let res = await fetchApi.get(`/movies/${id}`);
    //console.log(res.data)
    if (res.data.statusCode === 200) {
          return res.data.movie;
    } else {
      console.log(res.data);
    }
  }
  
  const onLogin = async (value) => {
    let res = await fetchApi.post("/users/login", { ...value });
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("userID", res.data.userID);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);
      setUser({
        userId: res.data.userID,
        token: res.data.token,
        role: res.data.role,
      });
      setMessage("");
      navigate("/dashboard");
    } else {
      setMessage(res.data.message);
    }
  };

  return (
    <GlobalProvider
      value={{
        onLogin,
        message,
        user,
        movies,
        theaters,
        getMovie,
        getTheater,
        getMovieWithId,
        setMessage
      }}
    >
      <div className="container-fluid">
        {layoutExclusionArray.indexOf(location.pathname) < 0 && <Layout />}
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/theaters" element={<TheatersPage />}></Route>
        <Route path="/movies" element={<MoviesPage />}></Route>
        <Route path="/movies/:id" element={<MoviePage />}></Route>
        <Route path="/buytickets/:id" element={<MovieShowPage />}></Route>
        <Route path="/booktickets/:id" element={<Seatingpage />}></Route>
        <Route path="/shows" element={<ShowsPage />}></Route>
        <Route path="/bookings" element={<BookingsPage />}></Route>
        <Route path="/users/profile/:id" element={<ProfilePage />}></Route>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
      <div className="container-fluid">
      {footerExclusionArray.indexOf(location.pathname.slice(0,12)) < 0 && <Footer />}
      </div>
    </GlobalProvider>
  );
}

export default App;
