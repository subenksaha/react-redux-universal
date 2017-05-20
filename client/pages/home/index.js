import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import { Affix, Layout, Row} from 'antd';
const { Content } = Layout;

import Header from 'client/components/header';
import Submenu from 'client/components/submenu';
import Footer from 'client/components/footer'
import RouteWithSubRoutes from 'client/routeWithSubRoutes';

import './home.css';

class Element extends Component {

  render() {
    const {
      location,
      routes
    } = this.props;

    return (
      <Layout>
        <Affix>
          <Header/>
          <Submenu/>
        </Affix>
        <Content className='bg_color_grey_light' style={{padding:'0px 10%', minHeight: 800}}>
            <Row>
              Sub Routes of /:
              <ul>
                {
                  routes && routes.length && routes.map(function(route,i){
                    return (<li key={i}><Link to={`${route.path}`}>{route.path}</Link></li>);
                  })
                }
              </ul>
              <Switch>
              {
                  routes && routes.length && routes.map((route, i) => ( 
                    <RouteWithSubRoutes key = { i } {...route }/>
                  ))
              } 
              </Switch>
            </Row>
        </Content>
        <Footer/>
      </Layout>
    );
  }
}

export default connect(null)(Element);