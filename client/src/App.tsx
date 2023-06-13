import { ConfigProvider, theme } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Paths } from "./paths.ts";
import { Login } from "./pages/login/index.tsx";
import { Register } from "./pages/register/index.tsx";
import { Auth } from "./features/auth/auth.tsx";
import { Employees } from "./pages/employees/index.tsx";
import { EmployeeAdd } from "./pages/EmployeeAdd/index.tsx";
import { Status } from "./pages/status/index.tsx";
import { Employee } from "./pages/employee/index.tsx";
import { EditEmployee } from "./pages/editEmployee/index.tsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: Paths.home,
      element: <Employees />,
    },
    {
      path: Paths.login,
      element: <Login />,
    },
    {
      path: Paths.register,
      element: <Register />,
    },
    {
      path: Paths.employeeAdd,
      element: <EmployeeAdd />,
    },
    {
      path: `${Paths.status}/:status`,
      element: <Status />,
    },
    {
      path: `${Paths.employee}/:id`,
      element: <Employee />,
    },
    {
      path: `${Paths.employeeEdit}/:id`,
      element: <EditEmployee />,
    },
  ]);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </>
  );
};

export default App;
