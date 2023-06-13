import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employee";
import { Layout } from "../../components/layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employeeForm";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const EditEmployee = () => {
  const navigate = useNavigate();

  const params = useParams<{ id: string }>();

  const [error, setError] = useState("");

  const { data, isLoading } = useGetEmployeeQuery(params.id || "");

  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const handleEdit = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };
      await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/updated`);
    } catch (e) {
      const maybeError = isErrorWithMessage(e);

      if (maybeError) {
        setError(e.data.message);
      } else {
        setError("Unknown Error"); 
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Редактировать сотрудника"
          btnText="Редактировать"
          error={error}
          employee={data}
          onFinish={handleEdit}
        />
      </Row>
    </Layout>
  );
};
