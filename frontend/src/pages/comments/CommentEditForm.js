import React, { useState } from "react";
//React boostrap component
import Form from "react-bootstrap/Form";
//API
import { axiosRes } from "../../api/axiosDefaults";
//styles css
import styles from "../../styles/CommentCreateEditForm.module.css";
// Notifications
import { NotificationManager } from "react-notifications";

function CommentEditForm(props) {
  // Destructure the props obj
  const { id, content, setShowEditForm, setComments } = props;
  //Define useState variables
  const [formContent, setFormContent] = useState(content);

  //handling comment textField changes
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  //handling form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
      NotificationManager.info("Comment edited");
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control className={styles.Form} as="textarea" value={formContent} 
            onChange={handleChange} rows={2} />
      </Form.Group>

      <div className="text-right">
        <button className={styles.Button} onClick={() => setShowEditForm(false)}
          type="button">
          cancel
        </button>
        <button className={styles.Button} disabled={!content.trim()}
          type="submit" >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;