import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Icon,
  Badge,
  Tooltip,
  Layout
} from 'antd';
const { Header } = Layout;

export default class Element extends Component {

  render() {
    return (
      <Header className="bg_color_primary fg_color_white">
        <Col span={2}>
          <div className="logo">
            App
          </div>
        </Col>

        <Col span={8} offset={14} className="pull-right">
          <Tooltip placement="bottom" title="Calender">
            <Icon type="calendar" className="padding-lr-md font-md pointer-hover fg_color_white" />
          </Tooltip>

          <Tooltip placement="bottom" title="Notification">
            <Badge dot className="padding-lr-md">
              <Icon type="notification" className="font-md pointer-hover fg_color_white" />
            </Badge>
          </Tooltip>

          <Tooltip placement="bottom" title="Setting">
            <Icon type="setting" className="padding-lr-md font-md pointer-hover fg_color_white" />
          </Tooltip>
        </Col>
      </Header>
    );
  }
}
