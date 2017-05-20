import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';
import Demo from 'client/pages/Demo';
import Home from 'client/pages/home';
import RouteWithSubRoutes from 'client/routeWithSubRoutes';
const routes = [{
    path: '/',
    component: Home,
    routes: [{
            path: '/subject',
            component: Demo,
            routes:[{
                path: '/subject/profile',
                component: Demo,
                routes:[{
                    path: '/subject/profile/edit',
                    component: Demo,
                },{
                    path: '/subject/profile/settings',
                    component: Demo,
                }]
            }]
        },{
            path: '/object',
            component: Demo
        }
    ]
}]
export default routes;