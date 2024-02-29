import AddFieldDay from "./components/pages/FieldDay/AddFieldDay";
import FieldDay from "./components/pages/FieldDay/FieldDay";
import Sidebar from "./components/pages/dashboard/DashboardLayout";
import DashboardLayout from "./components/pages/dashboard/DashboardLayout";
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
        path: "/addProject",
        element: <AddProjects />,
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
        path: "*",
        element: <NotFound></NotFound>,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard/all-project',
            element: <DashboardLayout />


          }
        ]

      }
    ],
  },

]);

export default router;
