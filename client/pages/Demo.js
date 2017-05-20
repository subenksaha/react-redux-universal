import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom';
import { Layout, Row } from 'antd';
import RouteWithSubRoutes from 'client/routeWithSubRoutes';

class Element extends Component {

  render() {
    const {
      routes
    } = this.props;

    return (
      <Layout>
        <Row style={{paddingLeft:'50px'}}>
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
      </Layout>
    );
  }
}

export default Element;