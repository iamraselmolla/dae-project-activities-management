import LoginPage from "./components/LogInPage/LoginPage";
import AddFieldDay from "./components/pages/FieldDay/AddFieldDay";
import FieldDay from "./components/pages/FieldDay/FieldDay";
import Dashboard from "./components/pages/dashboard/Dashboard";
import DashboardLayout from "./components/pages/dashboard/DashboardLayout";
import AllProjects from "./components/pages/dashboard/admin/allProjects/AllProjects";
import Allusers from "./components/pages/dashboard/admin/allUsers/Allusers";
import AddDemo from "./components/pages/demo/AddDemo";
import Demo from "./components/pages/demo/Demo";
import Distribution from "./components/pages/distrubution/Distribution";
import NotFound from "./components/pages/notfound/NotFound";
import AddProjects from "./components/pages/projects/AddProjects";
import AddTraining from "./components/pages/training/AddTraining";
import Training from "./components/pages/training/Training";
import Profile from "./components/shared/Profile";
import AddGroupMeeting from "./components/pages/DaeGroupMeeting/AddGroupMeeting";
import DaeGroupMeeting from "./components/pages/DaeGroupMeeting/DaeGroupMeeting";
import UserNotes from "./components/pages/dashboard/user/notes/UserNotes";
import AdminTrainings from "./components/pages/dashboard/admin/DashboardTrainings/AdminTrainings";
import UserFieldDays from "./components/pages/dashboard/user/UserFieldDays/UserFieldDays";
import UserDaeMeetings from "./components/pages/dashboard/user/group-meeting/UserDaeMeetings";
import UserDemos from "./components/pages/dashboard/user/demos/UserDemos";
import AddNotes from "./components/pages/note/AddUserNotes";
import DemoDetails from "./components/pages/demo/DemoDetails";
import AddDistribution from "./components/pages/distrubution/AddDistribution";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import UserRoute from "./components/PrivateRoute/UserRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

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
        path: "/demo/:id",
        element: <DemoDetails></DemoDetails>,
      },
      {
        path: "/trainings",
        element: <Training></Training>,
      },
      {
        path: "/fielddays",
        element: <FieldDay></FieldDay>,
      },
      {
        path: "/distributions",
        element: <Distribution></Distribution>,
      },
      {
        path: "/addDistribution",
        element: <AdminRoute><AddDistribution></AddDistribution></AdminRoute>,
      },
      {
        path: "/addDemo",
        element: <UserRoute><AddDemo /></UserRoute>,
      },
      {
        path: "/addFieldDay",
        element: <UserRoute><AddFieldDay /></UserRoute>,
      },
      {
        path: "/addTraining",
        element: <AdminRoute><AddTraining /></AdminRoute>,
      },
      {
        path: "/add-dae-group-meeting",
        element: <UserRoute><AddGroupMeeting /></UserRoute>,
      },
      {
        path: "/dae-group-meeting",
        element: <DaeGroupMeeting />,
      },
      {
        path: "/addDemo",
        element: <UserRoute><AddTraining /></UserRoute>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/add-note",
        element: <PrivateRoute><AddNotes /></PrivateRoute>,
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/all-projects",
            element: <AdminRoute><AllProjects /></AdminRoute>,
          },
          {
            path: "/dashboard/all-users",
            element: <AdminRoute><Allusers /></AdminRoute>,
          },
          {
            path: "/dashboard/addProject",
            element: <AdminRoute><AddProjects /></AdminRoute>,
          },
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/dashboard/user-demos",
            element: <UserDemos><UserDemos /></UserDemos>,
          },
          {
            path: "/dashboard/user-fielddays",
            element: <UserRoute><UserFieldDays /></UserRoute>,
          },
          {
            path: "/dashboard/user-dae-meetings",
            element: <UserRoute><UserDaeMeetings /></UserRoute>,
          },
          {
            path: "/dashboard/user-notes",
            element: <UserNotes />,
          },
          {
            path: "/dashboard/trainings",
            element: <AdminRoute><AdminTrainings /></AdminRoute>,
          },
        ],
      },
    ],
  },
]);

export default router;
