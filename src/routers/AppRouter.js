import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";

import ExpenseDashboardPage from "./../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";

const WrapperComponent = ({ children }) => {
  const navigate = useNavigate();
  const params = useParams();
  return children({ navigate, params });
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <ExpenseDashboardPage />,
      },
      {
        path: "create",
        element: (
          <WrapperComponent>
            {({ navigate }) => <AddExpensePage navigate={navigate} />}
          </WrapperComponent>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <WrapperComponent>
            {({ navigate, params }) => (
              <EditExpensePage navigate={navigate} params={params} />
            )}
          </WrapperComponent>
        ),
      },
      {
        path: "help",
        element: <HelpPage />,
      },
    ],
  },
]);

const AppRouter = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default AppRouter;
