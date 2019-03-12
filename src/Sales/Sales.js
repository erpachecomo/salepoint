import React from "react";
import { Row, Col, Divider } from "antd";

import Table from "./SalesTable";
import AddProduct from "./AddProduct";
import SalesHeader from "./Header";
import { blue } from "../utils/Colors";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class Sales extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <SalesHeader />
          </Col>
        </Row>
        <Divider>Carrito de productos</Divider>
        <Row gutter={10}>
          <Col span={16}>
            <Table />
          </Col>
          <Col span={8}>
            <Divider>Agregar producto</Divider>
            <AddProduct />
            <Divider>Opciones de pago</Divider>
          </Col>
        </Row>
        <Row style={{ background: blue }}>
          <Col span={6}>Total: 123.45</Col>
          <Col span={6}>Subtotal: 100.25</Col>
          <Col span={6}>IVA: 23.20</Col>
          <Col span={6}>PAGAR</Col>
        </Row>
      </div>
    );
  }
}

export default Sales;
