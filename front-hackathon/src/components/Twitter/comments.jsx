import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import myAxios from '../../utils/axios';
import { fetchPosts } from '../../redux/slices/postsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowsSpin, faComment, faTrash } from '@fortawesome/free-solid-svg-icons';

function CommentsModal({ comments, postId, isModalOpen, setIsModalOpen }) {
    const [newComment, setNewComment] = useState('');

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();


    const toggle = () => {
        setIsModalOpen(!isModalOpen);
        setNewComment('');
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = () => {
        if(newComment === '') return;

        myAxios.post(`/tweets/commentaire/${postId}`, {
            comment: {
                userId: user.user.id,
                content: newComment,
            }
        })
        .then((response) => {
            console.log('Comment added:', response.data);
            if (response.status === 201) {
                dispatch(fetchPosts());
                setNewComment('');
            }
        })
        .catch((error) => {
            // Handle error
            console.error('Error adding comment:', error);
        });
    };

    const handleDelete = async (commentId) => {
        const response = await myAxios.delete(`/tweets/commentaire/${postId}/${commentId}`);
        console.log(response)

        if (response.status === 200) {
            dispatch(fetchPosts());
        }
    }

    return (
        <div className="comments-modal-container">
            <p onClick={toggle}>
                <FontAwesomeIcon icon={faComment} className="comments-icon" />
                <span className="comments-count">{comments.length}</span>
            </p>

            <Modal isOpen={isModalOpen} toggle={toggle} className="comments-modal" size="lg">
                <ModalHeader toggle={toggle} className="comments-modal-header">
                    Commentaires
                </ModalHeader>

                <ModalBody className="comments-modal-body x-like-style">
                    {comments.length > 0 ? (
                        <ul className="comments-list">
                            {comments.map((comment, index) => {
                                
                                if(comment.userId === null) return null;
                                const isUser = comment.userId._id === user.user.id

                                return (
                                <li key={index} className="comment-item">
                                    <div>
                                        <div className="comment-user">
                                            <strong>{comment.userId.username}</strong>
                                        </div>
                                        <div className="comment-content">
                                            {comment.content}
                                        </div>
                                    </div>

                                    {isUser ? <p onClick={() => {handleDelete(comment._id)}} className='delete'><FontAwesomeIcon icon={faTrash} /></p> : null}
                                </li>
                            )})}
                        </ul>
                    ) : (
                        <div className="no-comments">
                            Aucun commentaire disponible.
                        </div>
                    )}
                </ModalBody>

                <ModalFooter className="comments-modal-footer">
                    <Form inline={true} className="add-comment-form">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input
                                type="textarea"
                                name="comment"
                                id="comment"
                                placeholder="Ajouter un commentaire..."
                                value={newComment}
                                onChange={handleCommentChange}
                                className="comment-input"
                            />
                        </FormGroup>
                        <Button color="primary" onClick={handleAddComment} className="add-comment-button">
                            Ajouter un commentaire
                        </Button>
                    </Form>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CommentsModal;