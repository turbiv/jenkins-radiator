import React from 'react';
import {connect} from "react-redux"
import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import { IconContext } from 'react-icons';
import { MdAccountCircle } from 'react-icons/md'
import { IoIosPower, IoMdHelpCircle, IoIosSettings, IoMdPeople, IoIosBriefcase, IoLogoBuffer  } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai'
import {removeUser} from "../reducers/loginReducer";


const Sidebar = (props) => {

  const SidebarData = [
    {
      title: 'Home',
      path: '/admin/home',
      icon: <AiFillHome />,
      cName: 'nav-text',
      permission: "read_radiators"
    },
    {
      title: 'Groups',
      path: '/admin/groups',
      icon: <IoLogoBuffer />,
      cName: 'nav-text',
      permission: "read_groups"
    },
    {
      title: 'Jobs',
      path: '/admin/jobs',
      icon: <IoIosBriefcase />,
      cName: 'nav-text',
      permission: "read_jobs"
    },
    /*{
      title: 'Owners',
      path: '/admin/owners',
      icon: <IoMdPeople/>,
      cName: 'nav-text',
      permission: null
    },
    {
      title: 'Options',
      path: '/admin/options',
      icon: <IoIosSettings />,
      cName: 'nav-text',
      permission: "administrator"
    }, */
    {
      title: 'Accounts',
      path: '/admin/accounts',
      icon: <MdAccountCircle />,
      cName: 'nav-text',
      permission: "modify_users"
    },
    /*{
      title: 'Support',
      path: '/admin/support',
      icon: <IoMdHelpCircle />,
      cName: 'nav-text',
      permission: null
    }*/
  ];

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={'nav-menu'}>
          <div className='nav-menu-items'>
            {SidebarData.map((item, index) => {
              if(0 >= props.login.permissions[item.permission] && props.login[item.permission] !== null && 0 >= props.login.permissions.administrator){
                return null
              }

              return (
                <div key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </div>
              );
            })}
            <div className={'nav-text'}>
              <Link to={"/"} onClick={() => props.removeUser()}>
                <IoIosPower />
                <span>Log out</span>
              </Link>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
}

const mapDispatchToProps = {
  removeUser
}


const mapStateToProps = (state) =>{
  return{
    login: state.login,
  }
};

const connectedSidebar = connect(mapStateToProps, mapDispatchToProps)(Sidebar);
export default connectedSidebar;