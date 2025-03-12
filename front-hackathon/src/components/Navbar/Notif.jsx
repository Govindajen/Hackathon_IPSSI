import React from 'react';
import { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

export default function NotifDropdown () {

    const [menu, setMenu] = useState(false);

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
                <DropdownItem>
                    Some Action
                </DropdownItem>
                <DropdownItem text>
                    Dropdown Item Text
                </DropdownItem>
                <DropdownItem disabled>
                    Action (disabled)
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    Foo Action
                </DropdownItem>
                <DropdownItem>
                    Bar Action
                </DropdownItem>
                <DropdownItem>
                    Quo Action
                </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    )
}