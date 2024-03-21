import { useNavigate } from "react-router-dom";
import { Form, Input, Spin, message } from "antd";
import { IoPerson, IoLockClosed } from "react-icons/io5";

import "./index.scss";
import { useEffect, useState } from "react";
import { LoginServiceImpl } from "../../services/login";
import { StorageServiceImpl } from "../../../../services/storage";

const FormLogin = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
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
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Informe o seu E-mail!" }]}
        >
          <Input
            prefix={<IoPerson style={{ marginRight: "5px" }} />}
            style={{ padding: "8px 15px" }}
            placeholder="E-mail"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Informe a senha!" }]}
        >
          <Input
            prefix={<IoLockClosed style={{ marginRight: "5px" }} />}
            style={{ padding: "8px 15px" }}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>

        <Form.Item className="button">
          {!loading ? (
            <button className="btn-default-size btn-standard">Entrar</button>
          ) : (
            <div className="btn-default-size btn-standard">
              <span>Entrando</span>
              <Spin size="small" />
            </div>
          )}
        </Form.Item>
        <div className="actions">
          <span className="action">Não tenho conta 🥲</span>
          <span className="action">Esqueci minha senha 🫣</span>
        </div>
      </Form>
    </>
  );
};

export default FormLogin;
