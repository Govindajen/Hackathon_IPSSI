import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink } from "reactstrap";

function FollowModal({ followers = [], following = [], isOpen, func }) {
    const [activeTab, setActiveTab] = useState("followers");

    const switchTab = (tab) => setActiveTab(tab);

    const renderList = (list) => (
        <ul className="follow-list">
            {list.length > 0 ? (
                list.map((user, index) => (
                    <li key={index} className="follow-item">
                        @{user.username}
                    </li>
                ))
            ) : (
                <div className="no-follow">No {activeTab} yet.</div>
            )}
        </ul>
    );

    return (
        <div className="follow-modal-container">
            <Modal isOpen={isOpen} toggle={func} className="follow-modal" size="lg">
                <ModalHeader toggle={func} className="follow-modal-header">
                    Followers & Following
                </ModalHeader>

                <ModalBody className="follow-modal-body">
                    <Nav tabs className="follow-tabs">
                        <NavItem>
                            <NavLink
                                className={activeTab === "followers" ? "active" : ""}
                                onClick={() => switchTab("followers")}
                            >
                                Followers ({followers.length})
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={activeTab === "following" ? "active" : ""}
                                onClick={() => switchTab("following")}
                            >
                                Following ({following.length})
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <div className="follow-list-container">
                        {activeTab === "followers" ? renderList(followers) : renderList(following)}
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="secondary" onClick={func} className="close-button">
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default FollowModal;
