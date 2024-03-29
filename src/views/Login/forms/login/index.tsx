import { useNavigate } from "react-router-dom";
import { Form, Input, Spin, message } from "antd";

import "./index.scss";
import { useEffect, useState } from "react";
import { LoginServiceImpl } from "../../services/login";
import { StorageServiceImpl } from "../../../../services/storage";

const initialValue = {
  email: "",
  password: "",
};

const FormLogin = ({ setFormActive }: any) => {
  // Estados
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  // Hooks
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Services
  const auth = new LoginServiceImpl();
  const storage = new StorageServiceImpl();

  const onFinish = async (data: { email: string; password: string }) => {
    setLoading(true);
    await auth
      .validateUser(data)
      .then((res) => {
        const { token, ...user } = res;
        const setedUser = storage.setData("user", user);
        const setedToken = storage.setData("token", token);
        if (setedUser && setedToken) {
          messageApi.success("Bom trabalho 😄");
          navigate("/dashboard");
        } else {
          messageApi.error("Erro ao efetuar Login 🥺");
        }
        setLoading(false);
      })
      .catch((reason) => {
        const error = reason.response?.data;
        console.error(reason);
        if (typeof error.message === "string") {
          messageApi.error(error.message);
        } else if (Array.isArray(error.message)) {
          error.message.map((err: string) => messageApi.error(err));
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    storage.deleteData("token");
  }, []);

  return (
    <>
      {contextHolder}
      <Form
        className="login-form"
        form={form}
        onFinish={onFinish}
        initialValues={initialValue}
        layout="vertical"
      >
        <div className="title-form">
          <h2>Login</h2>
        </div>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: "Informe o seu E-mail!" }]}
          className="input-form"
        >
          <Input
            prefix={
              <span className="material-symbols-rounded icon-form">mail</span>
            }
            style={{ padding: "8px 15px" }}
            placeholder="email@email.com"
            type="email"
          />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Informe a senha!" }]}
          className="input-form"
        >
          <Input.Password
            prefix={
              <span className="material-symbols-rounded icon-form">lock</span>
            }
            style={{ padding: "8px 15px" }}
            placeholder="********"
          />
        </Form.Item>

        <Form.Item className="button">
          {!loading ? (
            <button className="button-enter">Entrar</button>
          ) : (
            <div className="info-enter">
              <span>Entrando</span>
              <Spin size="small" />
            </div>
          )}
        </Form.Item>

        <button
          className="btn-recovery"
          onClick={() => setFormActive("Recovery")}
          type="button"
        >
          Esqueci minha senha 🫣
        </button>
      </Form>
    </>
  );
};

export default FormLogin;
