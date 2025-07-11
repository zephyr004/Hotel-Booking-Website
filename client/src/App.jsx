import {Route, Routes} from "react-router-dom";
import './App.css'
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import  ProfilePage  from "./pages/ProfilePage.jsx";
import Layout from './Layout';
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import {useEffect} from "react";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>          
          <Route index element={<IndexPage />} />
          <Route path = "/login" element = {<LoginPage />} />           
          <Route path = "/register" element = {<RegisterPage />} />
          <Route path = "/account/" element = {<ProfilePage />} />
          <Route path = "/account/places" element = {<PlacesPage />} />
          <Route path = "/account/places/new" element = {<PlacesFormPage />} />
          <Route path = "/account/places/:id" element = {<PlacesFormPage />} />
          <Route path="/place/:id" element= {<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>      
      </Routes>
    </UserContextProvider>

  )
}

export default App
