import React, { useState } from "react";
//Router
import { Link } from "react-router-dom";
//React boostrap  components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
//styles css
import styles from "../../styles/CommentCreateEditForm.module.css";
//components
import Avatar from "../../components/Avatar";
//API
import { axiosRes } from "../../api/axiosDefaults";

//Destructure props obj
function CommentCreateForm(props) {
  const { recipe, setRecipe, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  //Handling comment textField changes
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  //Handling Form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        recipe,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setRecipe((prevRecipe) => ({
        results: [
          {
            ...prevRecipe.results[0],
            comments_count: prevRecipe.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
        {/* Link to the user's profile */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        send
      </button>
    </Form>
  );
}

export default CommentCreateForm;
