import React from "react";
import { Breadcrumb } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const CustomBreadCrumb = ({ collapsed, selected }) => {
  return (
    <Breadcrumb
      style={{
        marginTop: "24px",
        marginLeft: "auto",
        marginRight: "24px",
      }}
    >
      <Breadcrumb.Item href="/">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/schedules">
        <CalendarOutlined />
        <span>Schedules</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>View</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
