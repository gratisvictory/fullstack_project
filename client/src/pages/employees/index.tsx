import { useEffect } from 'react'
import { PlusCircleOutlined } from "@ant-design/icons";
import { Layout } from "../../components/layout";
import { MyButton } from "../../components/myButton";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employee";
import type { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees = () => {
  
  const navigate = useNavigate();

  const user = useSelector(selectUser)

  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
        navigate('/login')
    }
  }, [navigate, user]) 

  const goToAddUser = () => navigate(Paths.employeeAdd)

  return (
    <Layout>
      <MyButton
        type="primary"
        onClick={goToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </MyButton>
      <Table
        dataSource={data}
        loading={isLoading}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
