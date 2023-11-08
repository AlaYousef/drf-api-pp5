import React, { useEffect, useState } from "react";

//react boostrap componets
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
//styles css
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
//API
import { axiosReq } from "../../api/axiosDefaults";
//pages/ componets
import Recipe from "./Recipe";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import PopularProfiles from "../profiles/PopularProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
//contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
//utils
import { fetchMoreData } from "../../utils/utils";


function RecipePage() {
  // get id from URL
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ results: [] });
  //get userContext
  const currentUser = useCurrentUser();
  // Get current user's profile picture
  const profile_image = currentUser?.profile_image;
  // useState for comments
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    // Hook to fetch recipes and comments on component mount
    const handleMount = async () => {
      try {
        const [{ data: recipe }, { data: comments }] = await Promise.all([
          axiosReq.get(`/recipes/${id}`),
          axiosReq.get(`/comments/?recipe=${id}`),
        ]);
        // update recipe state with fetched recipe
        setRecipe({ results: [recipe] });
        // update comment state 
        setComments(comments);
        //console.log(recipe);
      } catch (err) {
        //console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Recipe {...recipe.results[0]} setRecipes={setRecipe} recipePage />
        {/* Comment container */}
        <Container className={appStyles.Content}>
          {/* check if the user exists to display CommentCreateForm */}
        {currentUser ? (
          <CommentCreateForm
            profile_id={currentUser.profile_id}
            profileImage={profile_image}
            recipe={id}
            setRecipe={setRecipe}
            setComments={setComments}
        />
        ) : comments.results.length ? (
          "Comments"
        ) : null}
          {/*check if the are any comment in the array */}
          {comments.results.length ? (
            <InfiniteScroll
            children={comments.results.map((comment) => (
              <Comment
                key={comment.id} {...comment}
                setRecipe={setRecipe}
                setComments={setComments}
              />
            ))}
            dataLength={comments.results.length}
            loader={<Asset spinner />}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}
          />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles/>
      </Col>
    </Row>
  );
}

export default RecipePage;