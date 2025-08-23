import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Bubble from "./pages/Bubble.jsx";
import Selection from "./pages/Selection.jsx";
import Insertion from "./pages/Insertion.jsx";
import Merge from "./pages/Merge.jsx";
import Quick from "./pages/Quick.jsx";
import Heap from "./pages/Heap.jsx";
import OddAndEven from "./pages/OddAndEven.jsx";
import Cycle from "./pages/Cycle.jsx";
import Counting from "./pages/Counting.jsx";
import Radix from "./pages/Radix.jsx";
import Bucket from "./pages/Bucket.jsx";

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "bubble",
        element: <Bubble/>
      },
      {
        path: "selection",
        element: <Selection/>
      },
      {
        path: "insertion",
        element: <Insertion/>
      },
      {
        path: "merge",
        element: <Merge/>
      },
      {
        path: "quick",
        element: <Quick/>
      },
      {
        path: "heap",
        element: <Heap/>
      },
      {
        path: "oddandeven",
        element: <OddAndEven/>
      },
      {
        path: "cycle",
        element: <Cycle/>
      },
      {
        path: "counting",
        element: <Counting/>
      },
      {
        path: "radix",
        element: <Radix/>
      },
      {
        path: "bucket",
        element: <Bucket/>
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)