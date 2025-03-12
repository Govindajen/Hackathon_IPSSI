import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup } from 'reactstrap';

function CommentsModal({ comments }) {
    const [modal, setModal] = useState(false);
    const [newComment, setNewComment] = useState('');

    comments = comments || [];

    const toggle = () => setModal(!modal);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            comments.push({ user: 'Current User', content: newComment });
            setNewComment('');
        }
    };

    return (
        <div className="comments-modal-container">
            <p onClick={toggle}>
                <FontAwesomeIcon icon={faComment} className="comments-icon" />
                <span className="comments-count">{comments.length}</span>
            </p>

            <Modal isOpen={modal} toggle={toggle} className="comments-modal" size="lg">
                <ModalHeader toggle={toggle} className="comments-modal-header">
                    Comments
                </ModalHeader>

                <ModalBody className="comments-modal-body">
                    {comments.length > 0 ? (
                        <ul className="comments-list">
                            {comments.map((comment, index) => (
                                <li key={index} className="comment-item">
                                    <div className="comment-user">
                                        <strong>{comment.user}</strong>
                                    </div>
                                    <div className="comment-content">
                                        {comment.content}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-comments">
                            No comments available.
                        </div>
                    )}
                </ModalBody>

                <ModalFooter className="comments-modal-footer">
                    <Form inline className="add-comment-form">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input
                                type="textarea"
                                name="comment"
                                id="comment"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={handleCommentChange}
                                className="comment-input"
                            />
                        </FormGroup>
                        <Button color="primary" onClick={handleAddComment} className="add-comment-button">
                            Add Comment
                        </Button>
                    </Form>
                    <Button color="secondary" onClick={toggle} className="close-button">
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CommentsModal;