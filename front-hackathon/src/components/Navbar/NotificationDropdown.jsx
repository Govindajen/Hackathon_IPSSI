import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Notification from './Notification';


export default function NotifDropdown () {
    const notifications = useSelector((state) => state.notif.notifications);

    const [menu, setMenu] = useState(false);

    const userId = useSelector((state) => state.auth.user.user.id);

    const filteredNotifications = notifications.filter(
      (notif) => notif.sendby._id !== userId
    );


    return (
        <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
        >
        <p className='notificationIconBtn'><FontAwesomeIcon icon={faBell} /> </p>            
        </DropdownToggle>


        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          {
              filteredNotifications.map((notif, index) => (
                  <Notification notif={notif} key={index}/>
              ))
          }
          {filteredNotifications.length === 0 && (
            <DropdownItem text style={{color: '#f5f5f5'}}>
              <div className="notificationItem">
                <FontAwesomeIcon icon={faBell} className="notificationBell"/>
                <p className="mb-0 font-weight-bold content">Aucune notification</p>
              </div>
            </DropdownItem>
          )}


        </DropdownMenu>
    </Dropdown>
    )
}