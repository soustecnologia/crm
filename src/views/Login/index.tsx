import "./index.scss";
import { PiInstagramLogoFill } from "react-icons/pi";
import { Popover } from "antd";

import FormLogin from "./forms/login";

const Login = () => {
  return (
    <>
      <div className="main-login">
        <div className="content">
          <div className="panel-infos">
            <h1>
              Olá, <br />
              bem vindo a SOUSV
            </h1>
            <div className="social-medias">
              <Popover content="Ir para o Instagram">
                <a
                  href="https://www.instagram.com/sousvtecnologia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PiInstagramLogoFill className="icon" />
                </a>
              </Popover>
            </div>
          </div>
          <div className="panel-login">
            <div className="logo">
              <img src="/logo.png" alt="Logo SOUSV" />
            </div>
            <div className="form-login">
              <FormLogin />
            </div>
            <div className="copy">Sousv Tecnologia © Copyright 2024</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
