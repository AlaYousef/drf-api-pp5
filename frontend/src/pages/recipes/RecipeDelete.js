// React / Router
import React from "react";
import { useHistory, useParams } from "react-router";
// API
import { axiosReq } from "../../api/axiosDefaults";
// React Bootstrap components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Styles
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
// Notifications
import { NotificationManager } from "react-notifications";
import MessageBox from "../../components/MessageBox";

// Component to confirm a post deletion

function RecipeDelete() {
  // Using the useHistory hook to handle navigation history
  const history = useHistory();
  // get id from the URL parameter
  const { id } = useParams();

  // Handle deleting a post
  const handleDelete = async () => {
    try {
      // Send a request to delete a post by its ID
      await axiosReq.delete(`/recipes/${id}/`);
      history.push(`/`);
      NotificationManager.info("Recipe Deleted");
    } catch (err) {
        console.log(err);
      NotificationManager.error(
        "There was an issue deleting the recipe",
        "Error"
      );
    }
  };

  return (
    <MessageBox  handleDelete={handleDelete}/>
  );
}

export default RecipeDelete;