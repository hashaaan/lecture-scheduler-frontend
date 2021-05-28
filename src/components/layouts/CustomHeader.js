import React from "react";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const CustomHeader = ({ collapsed, toggle }) => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: toggle,
      })}
      {React.createElement(LogoutOutlined, {
        className: "trigger right",
        onClick: () => {},
      })}
      {React.createElement(BellOutlined, {
        className: "trigger right",
        onClick: () => {},
      })}
    </Header>
  );
};

export default CustomHeader;
