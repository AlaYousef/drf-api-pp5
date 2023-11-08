import React, { useEffect, useState } from "react";
//React boostrap components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
//styles css
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
//router
import { useHistory, useParams } from "react-router-dom";
//API
import { axiosRes } from "../../api/axiosDefaults";
//contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
//Notifications
import { NotificationManager } from 'react-notifications';

const UserPasswordForm = () => {
  const history = useHistory();
  // get id from the URL 
  const { id } = useParams();
  // get current user form useCurrentUser context
  const currentUser = useCurrentUser();
  //initial state for  userData object
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  //destructure  new_password1, new_password2 from userData obj
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  //handling inputs changes
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if he is not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  //handling form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //post the new changes to the API
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      NotificationManager.success(
        "password updated successfully",
        "Success!", 3000
      );
      history.goBack();
    } catch (err) {
      //console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Blue}`}
            >
              save
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;