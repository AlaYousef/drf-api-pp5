import React from "react";
//react boostrap components
import { Button } from "react-bootstrap";
//styles css
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
//Route
import { Link } from "react-router-dom";
//components
import Avatar from "../../components/Avatar";
//contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  //Destructure props
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  //get currentUser obj and check if it the profile owner
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Get handleFollow, handleUnfollow fun. from context
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        {/* Link to the profile page */}
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      {/* Follow/unfollow btns */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {/* Show unfollow button if the current user is not the owner */}
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)} >
              unfollow
            </Button>
          ) : (
            <Button className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)} >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;