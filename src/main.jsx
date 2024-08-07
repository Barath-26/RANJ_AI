import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homepage/HomePage";
import DashboardPage from "./routes/dashboard/DashboardPage";
import ChatPage from "./routes/chatpage/ChatPage";
import RootLayout from "./layouts/rootlayout/RootLayout";
import DashboardLayout from "./layouts/dashboardlayout/DashboardLayout";
import SigninPage from "./routes/signin/SigninPage";
import SignupPage from "./routes/signup/SignupPage";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children:[
      {
        path:"/",
        element:<HomePage/>,
      },
      {
        path:"/sign-in/*",
        element:<SigninPage/>,
      },
      {
        path:"/sign-up/*",
        element:<SignupPage/>,
      },
      {
        element:<DashboardLayout/>,
        children:[
          {
            path:"/dashboard",
            element:<DashboardPage/>
          },
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
