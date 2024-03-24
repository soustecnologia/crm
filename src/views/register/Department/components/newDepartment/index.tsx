import { Offcanvas } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Department } from "../../services/types";
import { HttpRequestsDepartmentImpl } from "../../services/http.request";
import { Button, Checkbox, Input, Select, message, Form } from "antd";
const { Option } = Select;
import "./index.scss";

const initialValue = {
  id: "",
  name: "",
  employees: null,
};

const NewDepartment = ({ show, handleClose, isEditing, department }: any) => {
  const httpRequest = new HttpRequestsDepartmentImpl();
  const [messageApi, contextHolder] = message.useMessage();
  const [editing, setEditing] = useState<boolean>(false);
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [departmentForm, setDepartmentForm] = useState(initialValue);

  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    // Faça a requisição para salvar os dados do form na sua API
    console.log(values);
  };

  useEffect(() => {
    form.resetFields(["id", "name", "employees"]);
    if (isEditing) {
      setDepartmentForm({
        id: department.id,
        name: department.name,
        employees: department.employees,
      });
    }
    if (show) {
      getEmployees();
    }
  }, [show]);

  const getEmployees = async () => {
    await httpRequest
      .findEmployeesCompany()
      .then((res) => {
        setEmployees(res);
      })
      .catch((reason) => {
        messageApi.error("Erro ao buscar os funcioários 🥺");
        console.error(reason);
      });
  };
  return (
    <>
      {contextHolder}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        scroll={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span className="title-offcanvas">
              {isEditing ? "Editar Repartamento" : "Novo Departamento"}
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Checkbox onChange={(e) => setComponentDisabled(!e.target.checked)}>
            Editar?
          </Checkbox>
          <Form form={form} onFinish={onSubmit} initialValues={departmentForm}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Por favor, insira o nome!" }]}
            >
              <Input placeholder="Nome" />
            </Form.Item>

            <Form.Item name="employees">
              <Select mode="tags" placeholder="Funcionários">
                {employees?.map((employee: any, idx: number) => {
                  return (
                    <Option key={idx} value={employee.id}>
                      {employee.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NewDepartment;
