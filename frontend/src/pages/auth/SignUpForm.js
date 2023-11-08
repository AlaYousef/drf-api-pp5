import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";
import { NotificationManager } from 'react-notifications';

const SignUpForm = () => {
    useRedirect("loggedIn");

    const [signUpData, setSignUpData] = useState({
        username : '',
        password1 :'',
        password2 : ''
    })
    const {username, password1, password2} = signUpData;
    const[errors, setErrors] = useState({

    });
    const history = useHistory();
    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        })
    }
    
    // handling submitting (post all signin data to the api and redirect to sign in page)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post('/dj-rest-auth/registration/', signUpData);
            // Displaying a success notification message after submitting the form 
            NotificationManager.success(
              "Signed up successfully ",
              "Success!", 3000
            );
            history.push('/signin');
        }catch(err){
            /* Errors conditional chaining */
            setErrors(err.response?.data)
        }
    }
  //Form TextFields
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={8}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>
          
         <p className={styles.Paregraph}>
         If you already have an account please 
         <Link className={styles.Link} to="/signin">
            <span> Sign in</span>
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

            <Form.Group as={Row} className="mb-3" controlId="password1">
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" placeholder="Your password" 
                                name="password1" value={password1} onChange={handleChange}/>
                </Col>
            </Form.Group>
             {/* Displaying password field errors */}
            {errors.password1?.map((message, index) => 
                <Alert varient="warning" key={index}>{message}</Alert>
            )}


            <Form.Group as={Row} className="mb-3" controlId="password2">
                <Form.Label column sm="2">
                    Confirm Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" placeholder="Confirm your password" 
                                name="password2" value={password2} onChange={handleChange}/>
                </Col>
            </Form.Group>
            {errors.password2?.map((message, index) => 
                <Alert varient="warning" key={index}>{message}</Alert>
            )}
            <Button variant="primary" type="submit" className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}>
                Sign up
            </Button>
             {/* Displaying password2 field errors */}
            {errors.non_field_errors?.map((message, index) => (
              <Alert key={index} variant="warning" className="mt-2">
                {message}
              </Alert>
            ))}
         </Form>

        </Container>
      </Col>
      <Col
        md={4}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/dko5fxoa0/image/upload/v1697621608/pexels-linda-ellershein-3127880_nlmn0p.webp"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;