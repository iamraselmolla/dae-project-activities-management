import LoginPage from "./components/LogInPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddFieldDay from "./components/pages/FieldDay/AddFieldDay";
import FieldDay from "./components/pages/FieldDay/FieldDay";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Sidebar from "./components/pages/dashboard/DashboardLayout";
import DashboardLayout from "./components/pages/dashboard/DashboardLayout";
import AllProjects from "./components/pages/dashboard/admin/AllProjects";
import Allusers from "./components/pages/dashboard/admin/Allusers";
import UserDemos from "./components/pages/dashboard/user/UserDemos";
import UserFieldDays from "./components/pages/dashboard/user/UserFieldDays";
import AddDemo from "./components/pages/demo/AddDemo";
import Demo from "./components/pages/demo/Demo";
import Distribution from "./components/pages/distrubution/Distribution";
import NotFound from "./components/pages/notfound/NotFound";
import AddProjects from "./components/pages/projects/AddProjects";
import AddTraining from "./components/pages/training/AddTraining";
import Training from "./components/pages/training/Training";

const { createBrowserRouter } = require("react-router-dom");
const { default: Layout } = require("./components/Layout");
const { default: Home } = require("./components/pages/home/Home");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/demos",
        element: <Demo></Demo>,
      },
      {
        path: "/trainings",
        element: <PrivateRoute><Training></Training></PrivateRoute>,
      },
      {
        path: "/fielddays",
        element: <PrivateRoute><FieldDay></FieldDay></PrivateRoute>,
      },
      {
        path: "/distributions",
        element: <Distribution></Distribution>,
      },
      {
        path: "/addDemo",
        element: <AddDemo />,
      },
      {
        path: "/addFieldDay",
        element: <AddFieldDay />,
      },
      {
        path: "/addTraining",
        element: <AddTraining />,
      },
      {
        path: "/addDemo",
        element: <AddTraining />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />

          },
          {
            path: '/dashboard/all-projects',
            element: <AllProjects />

          },
          {
            path: '/dashboard/all-users',
            element: <Allusers />

          },
          {
            path: "/dashboard/addProject",
            element: <AddProjects />,
          },
          {
            path: "/dashboard/user-demos",
            element: <UserDemos />
          },
          {
            path: "/dashboard/user-fielddays",
            element: <UserFieldDays />
          },
        ]

      }
    ],
  },

]);

export default router;
