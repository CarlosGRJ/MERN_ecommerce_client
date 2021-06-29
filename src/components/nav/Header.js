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
import { useDispatch, useSelector } from 'react-redux';
import { types } from '../../types/types';
import { Search } from '../forms/Search';

const { SubMenu, Item } = Menu;

export const Header = () => {
   const [current, setCurrent] = useState('home');

   const dispatch = useDispatch();
   const { user } = useSelector((state) => ({ ...state }));

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

         {!user && (
            <Item
               key='register'
               icon={<UserAddOutlined />}
               className='float-right'>
               <Link to='/register'>Register</Link>
            </Item>
         )}

         {!user && (
            <Item key='login' icon={<UserOutlined />} className='float-right'>
               <Link to='/login'>Login</Link>
            </Item>
         )}

         {user && (
            <SubMenu
               key='SubMenu'
               icon={<SettingOutlined />}
               title={user.email && user.email.split('@')[0]}
               className='float-right'>
               {user && user.role === 'subscriber' && (
                  <Item>
                     <Link to='/user/history'>Dashboard</Link>
                  </Item>
               )}

               {user && user.role === 'admin' && (
                  <Item>
                     <Link to='/admin/dashboard'>Dashboard</Link>
                  </Item>
               )}

               <Item icon={<LogoutOutlined />} onClick={logout}>
                  Logout
               </Item>
            </SubMenu>
         )}

         <span className='float-right p-1'>
            <Search />
         </span>
      </Menu>
   );
};
