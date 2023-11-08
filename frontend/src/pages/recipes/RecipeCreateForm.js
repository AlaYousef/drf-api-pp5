import React, { useRef, useState } from "react";
//React boostrap component
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
//componets
import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
//styles css
import styles from "../../styles/RecipeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
//API
import { axiosReq } from "../../api/axiosDefaults";
//hooks
import { useRedirect } from "../../hooks/useRedirect";
//Notifications
import { NotificationManager } from 'react-notifications';


function RecipeCreateForm() {
  // redirect if the user is logged out using the useRedirect hook 
  useRedirect("loggedOut");
  // initial state for errors and postdata objects respectivly
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    name: "",
    ingredients: "",
    steps: "",
    image: "",
  });

  //destructure the values od postData variables
  const { name, ingredients, steps, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  //handling inputFields changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  //handling image changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  //handling form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("image", imageInput.current.files[0]);

    try {
      //post new changes to the API
      const { data } = await axiosReq.post("/recipes/", formData);
      //display success notificatiom msg aget creation
      NotificationManager.success(
        "Recipe created successfully",
        "Success!", 3000
      );
      history.push(`/recipes/${data.id}`);
    } catch (err) {
      //console.log(err);
        setErrors(err.response?.data);
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
       {/*Displaying name field errors */} 
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>ingredients</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="ingredients"
          value={ingredients}
          onChange={handleChange}
        />
      </Form.Group>
      {/*Displaying ingredients field errors */} 
      {errors?.ingredients?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>steps</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="steps"
          value={steps}
          onChange={handleChange}
        />
      </Form.Group>
      {/*Displaying steps field errors */} 
      {errors?.steps?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
      {/*Displaying non field errors */} 
      {errors.non_field_errors?.map((message, index) => (
              <Alert key={index} variant="warning" className="mt-2">
                {message}
              </Alert>
      ))}

    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mx-auto">
      <Col className="py-2 p-0 p-md-2" md={5} lg={5}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
             <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {/*Displaying any errors in image field */} 
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
       
            <div className="d-md-none">{textFields}</div>
           </Container>
        </Col>
        <Col md={7} lg={6} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default RecipeCreateForm;