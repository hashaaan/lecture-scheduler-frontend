import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  IdcardOutlined,
  BookOutlined,
  SolutionOutlined,
  BankOutlined,
  PrinterOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const CustomSidebar = ({ collapsed, selected }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">{collapsed ? "LSS" : "NIBM - LSS"}</div>
      <Menu theme="dark" mode="inline" selectedKeys={selected}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          <Link to="/schedules">Schedules</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<IdcardOutlined />}>
          Lecturers
        </Menu.Item>
        <Menu.Item key="4" icon={<SolutionOutlined />}>
          Batches
        </Menu.Item>
        <Menu.Item key="5" icon={<BookOutlined />}>
          Modules
        </Menu.Item>
        <Menu.Item key="6" icon={<BankOutlined />}>
          <Link to="/halls">Halls</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<PrinterOutlined />}>
          Reports
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default CustomSidebar;
