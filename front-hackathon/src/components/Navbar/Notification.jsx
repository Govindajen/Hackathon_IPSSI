import { DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function Notification ({notif}) {

    const { content, type, sendby, sendfor, date } = notif;

    return (
        <>
        <DropdownItem text style={{color: '#f5f5f5'}}>
            <div className="notificationItem">
                <FontAwesomeIcon icon={faBell} className="notificationBell"/>
                <p className="mb-0 font-weight-bold content">{content}</p>
            </div>
        </DropdownItem>

        <DropdownItem divider />
        </>
    )
}   