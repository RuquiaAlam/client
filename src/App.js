import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector} from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";

import Profile from "./pages/doctor/Profile";
import Events from "./pages/Events";


function App() {

  const {loading} = useSelector(state => state.alerts);
  //target reducer
  return (
  <>
    {/* container */}
<BrowserRouter>
{loading ? (
<Spinner/>
 ) : (
<Routes>
  <Route path ="/" element = {
  <ProtectedRoute>
    <HomePage />
    </ProtectedRoute>}></Route>

    <Route path ="/apply-doctor" element = {
  <ProtectedRoute>
    <ApplyDoctor/>
    </ProtectedRoute>}></Route>
    
    <Route path ="/admin/users" element = {
  <ProtectedRoute>
    <Users />
    </ProtectedRoute>}></Route>

    <Route path ="/admin/doctors" element = {
  <ProtectedRoute>
    <Doctors />
    </ProtectedRoute>}></Route>
    <Route path ="/doctor/profile/:id" element = {
  <ProtectedRoute>
    <Profile />
    </ProtectedRoute>}></Route>
    <Route path ="/doctor/Events/:doctorId" element = {
  <ProtectedRoute>
    <Events/>
    </ProtectedRoute>}></Route>
    
    <Route path ="/notification" element = {
  <ProtectedRoute>
    <NotificationPage/>
    </ProtectedRoute>}></Route>
  <Route path="login" element = {
  <PublicRoute>
  <Login/>
  </PublicRoute>
}></Route>
  <Route path="register" element= {
  <PublicRoute>
    <Register/>
    </PublicRoute>}></Route>


</Routes>
)}

</BrowserRouter>
  </>
  );
}

export default App;
