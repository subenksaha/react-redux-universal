import React, {Component} from 'react';
import {Link} from 'react-router';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import routes from 'client/routes';

class Element extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
  handleClick = (item, key, keyPath) => {
  }
  render() {
		return (
			<Menu
			onClick={this.handleClick}
			mode="horizontal"
			className='bg_color_primary_light fg_color_white'
			theme='dark'
			style={{padding: '0 10%'}}>
				<SubMenu title={<span><Icon type="appstore"/>Home</span>}>
					<Menu.Item key="home:feed1">User</Menu.Item>
					<Menu.Item key="home:feed2">Object</Menu.Item>
				</SubMenu>
				<SubMenu title={<span><Icon type="appstore" />User</span>}>
					<Menu.Item key="user:profile">Profile</Menu.Item>
					<Menu.Item key="user:setting">Edit</Menu.Item>
				</SubMenu>
				<Menu.Item key="alipay">
					<Icon type="appstore" />Payments
				</Menu.Item>
			</Menu>
		);
  }
}

export default connect(null)(Element);