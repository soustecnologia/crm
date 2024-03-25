import "./index.scss";
import { PiInstagramLogoFill } from "react-icons/pi";
import { Popover } from "antd";

import FormLogin from "./forms/login";
import FormRecovery from "./forms/recovery";
import { useState } from "react";

const Login = () => {
  const [formActive, setFormActive] = useState("Login");
  return (
    <>
      <div className="main-login">
        <div className="left">
          <img className="logo" src="/logo.png" alt="Logo SOUSV" />
          <h1>Bem vindo a SOUSV</h1>
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
        <div className="right">
          <div className="effects">
            <span className="ef-1"></span>
            <span className="ef-2"></span>
          </div>
        </div>
        <img className="logo-mobile" src="/logo.png" alt="Logo SOUSV" />
        <div className="forms-app">
          {formActive === "Login" ? (
            <FormLogin setFormActive={setFormActive} />
          ) : (
            <FormRecovery setFormActive={setFormActive} />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
