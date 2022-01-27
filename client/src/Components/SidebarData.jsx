import React from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
      title: 'Profile',
      path: '/ViewProfile',
      icon: <AiIcons.AiFillProfile />,
      cName: 'nav-text'
    },
    {
      title: 'Messages',
      path: '/Home',
      icon: <AiIcons.AiFillMessage />,
      cName: 'nav-text'
    },
    {
      title: 'Trending',
      path: '/UserHome',
      icon: <IoIcons.IoTrendingUpOutline />,
      cName: 'nav-text'
    }
];