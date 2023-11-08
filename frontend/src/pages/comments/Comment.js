import React, { useState } from "react";
//React boostrap component
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
//styles css
import styles from "../../styles/Comment.module.css";
//contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
//API
import { axiosRes } from "../../api/axiosDefaults";
//Component
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";
// Notifications
import { NotificationManager } from "react-notifications";

//Destructure props obj
const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setRecipe,
    setComments,
  } = props;
 
  //useState variable
  const [showEditForm, setShowEditForm] = useState(false);
  //Get currentUser obj and check if he is the owner
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  //Handling comment deletion
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setRecipe((prevRecipe) => ({
        results: [
          {
            ...prevRecipe.results[0],
            comments_count: prevRecipe.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      NotificationManager.info("Comment deleted");
    } catch (err) {}
  };

  return (
    <>
      <hr />
      <Media>
        {/* Link to the user's profile */}
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            // If showEditForm is true, render the CommentEditForm component
            <CommentEditForm  id={id} profile_id={profile_id}
              content={content} profileImage={profile_image}
              setComments={setComments} setShowEditForm={setShowEditForm}/>
          ) : (
            // If false, display content
            <p>{content}</p>
          )}
        </Media.Body>
        {/* Render the MoreDropdown component if  currentUser is comment owner */}
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
};

export default Comment;