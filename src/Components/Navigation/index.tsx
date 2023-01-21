import React, { useState } from "react";
import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MenuProps, Menu, Row, Col } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("View Data", "2", <EyeOutlined />),
];

const Navigation = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("1");

  const onClick: MenuProps["onClick"] = async (e) => {
    if (e.key === "1") {
      navigate("/users/create");
    } else {
      navigate("/users/view");
    }

    setCurrent(e.key);
  };
  return (
    <Row>
      <Col span={24}>
        <Menu
          theme={"dark"}
          onClick={onClick}
          style={{ display: "flex" }}
          defaultOpenKeys={["1"]}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Col>
    </Row>
  );
};

export default Navigation;
