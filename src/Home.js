import React from "react";
import { Divider, Affix, Button, Layout, Menu, Icon } from "antd";

import Inventory from "./inventory/Inventory";
import Sales from "./Sales/Sales";
import Users from "./Users/Users";

import "./styles.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const { Header, Sider, Content, Footer } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
    bottom: 10,
    selected: "Ventas",

  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { selected } = this.state;
    const content =
      selected === "Ventas" ? (
        <Sales />
      ) : selected === "Usuarios" ? (
        <Users />
      ) : (
        <Inventory />
      );
    return (
      <Layout ref={(node) => { this.container = node; }}>
      
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu  theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item className="left" key="1" onClick={() => this.setState({ selected: "Ventas" })}>
              <Icon type="dollar" />
              <span>Ventas</span>
            </Menu.Item>
            <Menu.Item className="left" key="2" onClick={() => this.setState({ selected: "Usuarios" })}>
              <Icon type="user" />
              <span>Usuarios</span>
            </Menu.Item>
            <Menu.Item className="left" key="3" onClick={() => this.setState({ selected: "Inventario" })}>
              <Icon type="barcode" />
              <span>Inventario</span>
            </Menu.Item>
            <Affix target={() => this.container} offsetBottom={this.state.bottom}>

                <Menu.Item onClick={this.toggle} className="trigger" key="4">

                    <Icon type={this.state.collapsed ? "right" : "left"} />

                </Menu.Item>
            </Affix>

          </Menu>
          
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
          <h1>{selected}</h1>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {content}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
