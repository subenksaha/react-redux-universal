import React, { Component } from 'react';
import {Layout} from 'antd';
const { Footer } = Layout;

export default class Element extends Component {

  render() {
    return (
        <Footer style={{ textAlign: 'center' }}>
          Created By Suben Kumer Saha {`<subenksaha@gmail.com>`}
        </Footer>
    );
  }
}