import { IoChevronDownOutline } from "react-icons/io5";
import "./index.scss";
import { Avatar, Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { StorageServiceImpl } from "../../../../services/storage";

type User = {
  companyId: string;
  departmentId: string;
  email: string;
  firstAccess: string;
  id: string;
  name: string;
  password: string;
  permissions: { registerEmployee: boolean };
  role: string;
  status: string;
};

const MenuProfile = () => {
  const storage = new StorageServiceImpl();

  const getInitials = (str: string) => {
    const words = str.split(" ");
    let firstInitial = words[0][0].toUpperCase();

    let lastInitial =
      words.length > 1 ? words[words.length - 1][0].toUpperCase() : "";

    return firstInitial + lastInitial;
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Link className="item-menu-profile" to="/settings/profile">
          Perfil
        </Link>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link className="item-menu-profile" to="/login">
          Sair
        </Link>
      ),
      key: "2",
    },
  ];

  const user = (): User => {
    return storage.getData("user");
  };
  return (
    <>
      <div className="main-menu-profile">
        <Avatar className="avatar" size={35} shape="square">
          {getInitials("Aldo Sousa")}
        </Avatar>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div className="name">
            <span>{user().name}</span>
            <IoChevronDownOutline />
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default MenuProfile;
