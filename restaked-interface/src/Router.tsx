import { createHashRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Operator from "./pages/Operator";
import AVS from "./pages/MarketPlace";

export const router = createHashRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "operators",
        element: <Operator />,
      },
      {
        path: "operator/:address",
        element: <Operator />,
      },

      {
        path: "avs",
        element: <AVS />,
      },
    ],
  },
]);
