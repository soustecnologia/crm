import { Link, useLocation } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Dropdown } from "antd";

import routesApp from "../../routes/routes";
import "./index.scss";
import MenuProfile from "./components/MenuProfile";
import Search from "./components/Search";
import Notifications from "./components/Notifications";

const Header = () => {
  const location = useLocation();

  const routeIsActive = (path: string | any) => {
    if (typeof path === "string") {
      return location.pathname === path;
    } else {
      const paths: string[] = [];
      path.map((item: any) => paths.push(item.path));
      return paths.includes(location.pathname);
    }
  };

  const MenuDropdown = ({ item }: { item: any }) => {
    const items: ItemType[] = [];

    item.children.map((sub: any, index: number) =>
      items.push({
        label: (
          <Link className="sub-item" to={`${sub.path}`}>
            {sub.name}
          </Link>
        ),
        key: index,
      })
    );
    return (
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className={`item ${routeIsActive(item.children) ? "active" : ""}`}>
          {item.name}
          <IoChevronDownOutline className="icon" />
        </div>
      </Dropdown>
    );
  };

  return (
    <>
      <div className="main-header">
        <div className="logo">
          <img src="/logo1.png" alt="Logo SOUSV" />
        </div>
        <div className="itens">
          {routesApp.map((route, index) => {
            if (route.children) {
              return <MenuDropdown item={route} key={index} />;
            } else {
              return (
                <Link
                  to={`${route.path}`}
                  className={`item ${
                    routeIsActive(route.path as string) ? "active" : ""
                  }`}
                  key={index}
                >
                  {route.name}
                </Link>
              );
            }
          })}
        </div>
        <div className="actions">
          <Search />
          <Notifications />
          <MenuProfile />
        </div>
      </div>
    </>
  );
};

export default Header;
