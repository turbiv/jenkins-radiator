import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import '../css/sidebar.css';
import { IconContext } from 'react-icons';

const Sidebar = () => {

  const SidebarData = [
    {
      title: 'Home',
      path: '/admin/home',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Groups',
      path: '/admin/groups',
      icon: <IoIcons.IoIosPaper />,
      cName: 'nav-text'
    },
    {
      title: 'Jobs',
      path: '/admin/jobs',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text'
    },
    {
      title: 'Owners',
      path: '/admin/owners',
      icon: <IoIcons.IoMdPeople />,
      cName: 'nav-text'
    },
    {
      title: 'Options',
      path: '/admin/options',
      icon: <IoIcons.IoMdHelpCircle />,
      cName: 'nav-text'
    },
    {
      title: 'Account',
      path: '/admin/account',
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: 'nav-text'
    },
    {
      title: 'Support',
      path: '/admin/support',
      icon: <IoIcons.IoMdHelpCircle />,
      cName: 'nav-text'
    },
    {
      title: 'Exit',
      path: '/',
      icon: <IoIcons.IoIosPower />,
      cName: 'nav-text'
    }
  ];

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={'nav-menu'}>
          <div className='nav-menu-items'>
            {SidebarData.map((item, index) => {
              return (
                <div key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default Sidebar;