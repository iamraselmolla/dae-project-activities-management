import FieldDay from "./components/pages/FieldDay/FieldDay";
import Demo from "./components/pages/demo/Demo";
import Distribution from "./components/pages/distrubution/Distribution";
import NotFound from "./components/pages/notfound/NotFound";
import Training from "./components/pages/training/Training";

const { createBrowserRouter } = require("react-router-dom");
const { default: Layout } = require("./components/Layout");
const { default: Home } = require("./components/pages/home/Home");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/demos',
                element: <Demo></Demo>
            },
            {
                path: '/trainings',
                element: <Training></Training>
            },
            {
                path: '/fielddays',
                element: <FieldDay></FieldDay>
            },
            {
                path: '/distributions',
                element: <Distribution></Distribution>
            },
            {
                path: "*",
                element: <NotFound></NotFound>
            }
        ]
    },

]);

export default router;