import React, { useState } from 'react';
import { Menu } from 'antd';
import {
   AppstoreOutlined,
   LogoutOutlined,
   SettingOutlined,
   UserAddOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { types } from '../../types/types';

const { SubMenu, Item } = Menu;

export const Header = () => {
   const [current, setCurrent] = useState('home');

   const dispatch = useDispatch();
   const history = useHistory();

   const handleClick = (e) => {
      setCurrent(e.key);
   };

   const logout = () => {
      firebase.auth().signOut();
      dispatch({
         type: types.authLogout,
         payload: null,
      });
      history.push('/login');
   };

   return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
         <Item key='home' icon={<AppstoreOutlined />}>
            <Link to='/'>Home</Link>
         </Item>

         <Item
            key='register'
            icon={<UserAddOutlined />}
            className='float-right'>
            <Link to='/register'>Register</Link>
         </Item>

         <Item key='login' icon={<UserOutlined />} className='float-right'>
            <Link to='/login'>Login</Link>
         </Item>

         <SubMenu key='SubMenu' icon={<SettingOutlined />} title='Username'>
            <Item key='setting:1'>Option 1</Item>
            <Item key='setting:2'>Option 2</Item>
            <Item icon={<LogoutOutlined />} onClick={logout}>
               Logout
            </Item>
         </SubMenu>
      </Menu>
   );
};
