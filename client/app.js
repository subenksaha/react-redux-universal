import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from 'client/routeWithSubRoutes';

class Element extends Component{
  render(){
    return(
      <div>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    )
  }
}
export default Element;