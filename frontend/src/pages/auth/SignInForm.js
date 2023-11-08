import React, { useState } from "react";
//API
import axios from "axios";
//boostrap component
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
//Router
import { Link, useHistory } from "react-router-dom";
//styles css
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
//contexts
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
//hooks
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";
//notification
import { NotificationManager } from 'react-notifications';

function SignInForm() {
  // use the useContext fun.
  const setCurrentUser = useSetCurrentUser();
   // useRedirect hook to redirect if the user is logged out
  useRedirect("loggedIn");

  // Destructure the useState hook by setting the initial state object to empty strings
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  /* useState hook with an empty object to store and set errors. */
  const[errors, setErrors] = useState({
  });

  const history = useHistory();

  // Handling inputs changes 
  const handleChange = (event) => {
    setSignInData({
        ...signInData,
        [event.target.name]: event.target.value
    })
}

  // handling submitting (post all signin data to the api and redirect to home page)
  const handleSubmit = async (event) => {

    /* preventDefault event so that the page doesn’t refresh. */
    event.preventDefault();
    try{
        const {data} = await axios.post('/dj-rest-auth/login/', signInData);
        setCurrentUser(data.user);
        // Displaying a success notification message after submitting the form 
        NotificationManager.success(
          "Signed in successfully ",
          "Success!", 3000
        );
        history.goBack();
    }catch(err){
        /* Errors conditional chaining */
        setErrors(err.response?.data);
    }
}
  // Form TextFields
  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={8}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>
          <p className={styles.Paregraph}>
            Don't have an account? 
            <Link className={styles.Link} to="/signup">
                <span> Sign up</span>
            </Link>
         </p>

         <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="username">
            <Form.Label column sm="2">
                UserName
            </Form.Label>
            <Col sm="10">
                <Form.Control type="text" placeholder="Enter your username" 
                            name="username" value={username} onChange={handleChange}/>
            </Col>
            </Form.Group>
            {/* Displaying username field errors */}
            {errors.username?.map((message, index) => 
                <Alert varient="warning" key={index}>{message}</Alert>
            )}

            <Form.Group as={Row} className="mb-3" controlId="password">
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" placeholder="Your password" 
                                name="password" value={password} onChange={handleChange}/>
                </Col>
            </Form.Group>
             {/* Displaying password field errors */}
            {errors.password?.map((message, index) => 
                <Alert varient="warning" key={index}>{message}</Alert>
            )}
            
            <Button variant="primary" type="submit" className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}>
                Sign in
            </Button>
             {/* Displaying non field errors */}
            {errors.non_field_errors?.map((message, index) => (
              <Alert key={index} variant="warning" className="mt-2">
                {message}
              </Alert>
            ))}

         </Form>
        </Container>
      </Col>

      <Col md={4}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`} >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://res.cloudinary.com/dko5fxoa0/image/upload/v1697621609/pexels-rdne-stock-project-7282017_n1vvep.webp"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;