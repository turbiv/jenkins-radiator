import React from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import { IconContext } from 'react-icons';
import { MdAccountCircle } from 'react-icons/md'
import { IoIosPower, IoMdHelpCircle, IoIosSettings, IoMdPeople, IoIosBriefcase, IoLogoBuffer  } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai'


const Sidebar = () => {

  const SidebarData = [
    {
      title: 'Home',
      path: '/admin/home',
      icon: <AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Groups',
      path: '/admin/groups',
      icon: <IoLogoBuffer />,
      cName: 'nav-text'
    },
    {
      title: 'Jobs',
      path: '/admin/jobs',
      icon: <IoIosBriefcase />,
      cName: 'nav-text'
    },
    {
      title: 'Owners',
      path: '/admin/owners',
      icon: <IoMdPeople />,
      cName: 'nav-text'
    },
    {
      title: 'Options',
      path: '/admin/options',
      icon: <IoIosSettings />,
      cName: 'nav-text'
    },
    {
      title: 'Account',
      path: '/admin/account',
      icon: <MdAccountCircle />,
      cName: 'nav-text'
    },
    {
      title: 'Support',
      path: '/admin/support',
      icon: <IoMdHelpCircle />,
      cName: 'nav-text'
    },
    {
      title: 'Exit',
      path: '/',
      icon: <IoIosPower />,
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