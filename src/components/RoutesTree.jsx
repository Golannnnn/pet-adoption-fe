import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Profile from "../pages/Profile";
import NoPage from "../pages/NoPage";
import Search from "../pages/Search";
import PetPage from "../pages/PetPage";
import MyPets from "../pages/MyPets";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedUserRoute from "./ProtectedUserRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import UserPage from "../pages/UserPage";
import EditPet from "../pages/EditPet";
import PetList from "../pages/PetList";
import UserList from "../pages/UserList";
import AddPet from "../pages/AddPet";

const RoutesTree = () => {
  console.log("rendering RoutesTree");
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/users/signup" element={<Signup />} />
      <Route path="/users/signin" element={<Signin />} />
      <Route path="/search" element={<Search />} />
      <Route path="/pets/:petId" element={<PetPage />} />
      <Route
        path="/admin/pets/:petId"
        element={
          <ProtectedAdminRoute>
            <EditPet />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/users/:userId"
        element={
          <ProtectedAdminRoute>
            <UserPage />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/users/profile"
        element={
          <ProtectedUserRoute>
            <Profile />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/users/mypets"
        element={
          <ProtectedUserRoute>
            <MyPets />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/pets/add"
        element={
          <ProtectedAdminRoute>
            <AddPet />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/users/list"
        element={
          <ProtectedAdminRoute>
            <UserList />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin/pets/list"
        element={
          <ProtectedAdminRoute>
            <PetList />
          </ProtectedAdminRoute>
        }
      />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default RoutesTree;
