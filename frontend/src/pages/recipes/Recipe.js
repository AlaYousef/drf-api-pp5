import React from "react";
import { useState } from 'react'
//React boostrap component
import { Card, Media, OverlayTrigger, Tooltip} from "react-bootstrap";
//styles css
import styles from "../../styles/Recipe.module.css";
//contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";

//Router
import { Link, useHistory } from "react-router-dom";
//Components
import { MoreDropdown } from "../../components/MoreDropdown";
import Avatar from "../../components/Avatar";
//API
import { axiosRes } from "../../api/axiosDefaults";
//Notifications
import { NotificationManager } from 'react-notifications';
import MessageBox from "../../components/MessageBox";

//Destrucure props obj
const Recipe = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    save_id,
    name,
    ingredients,
    steps,
    image,
    updated_at,
    recipePage,
    setRecipes,
  } = props;
  // Get the current user from CurrentUserContext and check if is the owner
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

    const [show, setShow] = useState(false);  
    
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true);
      
    };

  //handling recipe editing
  const handleEdit = () => {
    history.push(`/recipes/${id}/edit`);
  };
  //handling recipe deletion
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/recipes/${id}/`);
      NotificationManager.success(
        "Recipe deleted successfully",
        "Success!", 3000
      );
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };
 
  //handling recipe like
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { recipe: id });
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? { ...recipe,  likes_count: recipe.likes_count + 1, like_id: data.id }
            : recipe;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };

 //handling recipe bookmark
  const handleBookmark = async () => {
    try {
      const { data } = await axiosRes.post("/bookmarks/", { recipe: id });
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? { ...recipe, save_id: data.id }
            : recipe;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };
  //handling recipe Unlike
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? { ...recipe, likes_count: recipe.likes_count - 1, like_id: null }
            : recipe;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };
  //handling recipe unBookmark
  const handleUnbookmark = async () => {
    try {
      await axiosRes.delete(`/bookmarks/${save_id}/`);
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        results: prevRecipes.results.map((recipe) => {
          return recipe.id === id
            ? { ...recipe, save_id: null }
            : recipe;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };
  return (
    <>
      <Card className={`${styles.Recipe}`}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && recipePage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleShow}
              />
            )}
          </div>
          </Media>
        </Card.Body>
        <Link to={`/recipes/${id}`}>
          <Card.Img src={image} alt={name} className={styles.CardImage}/>
        </Link>

        <div className="d-flex align-items-left">
          {/* check if current user is the owner so owners cann't like/unlike their own recipe */}
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own recipe!</Tooltip>}
              >
                <i className="fa-solid fa-thumbs-up" />
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={`fa-solid fa-thumbs-up ${styles.Heart}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={`fa-regular fa-thumbs-up ${styles.HeartOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like recipes!</Tooltip>}
              >
                <i className="fa-solid fa-thumbs-up" />
              </OverlayTrigger>
            )}
            {/* displayong number of Likes */}
            {likes_count}

            
            <Link to={`/recipes/${id}`}>
              <i className="far fa-comments" />
            </Link>
             {/* dispalying number of comments */}
            {comments_count}
            {/* check if current user is the owner so owners cann't bookmarks their own recipe */}
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't bookmark your own recipe!</Tooltip>}
                >
                  <i className="fa-solid fa-bookmark" />
                </OverlayTrigger>
              ) : save_id ? (
                <span onClick={handleUnbookmark}>
                  <i className={`fa-solid fa-bookmark ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={handleBookmark}>
                  <i className={`fa-regular fa-bookmark ${styles.HeartOutline}`} />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to bookmark recipe!</Tooltip>}
                >
                  <i className="fa-solid fa-bookmark" />
                </OverlayTrigger>
              )}

          </div>
          
            <Card.Body>
              {name && <Card.Title className="font-weight-bold"> Recipe: {name}</Card.Title>}
              <span>Ingredients:</span> {ingredients && <Card.Text className="font-weight-normal">
               {ingredients}</Card.Text>}
               <span>Directions:</span> {steps && <Card.Text className="font-weight-normal"> 
                {steps}</Card.Text>}
            </Card.Body>
      </Card>
      <MessageBox show={show} handleClose={handleClose} 
       handleDelete = {handleDelete} />
     
    </>
  );
};

export default Recipe;