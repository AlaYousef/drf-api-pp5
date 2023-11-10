// Bootstrap imports
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
// CSS imports
import btnStyles from "../styles/Button.module.css";

const MessageBox = (props) => {

  const {
    showModal,
    handleClose,
    handleCommentDelete,
    handleRecipeDelete,
    type,
    message,
  } = props


  return (

    <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
    
      { /* Delete Modal content for deleting a comment */ }
      {type === "comment" && 
        <>
          <Button className={`${btnStyles.Button} ${btnStyles.Modal}`} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={`${btnStyles.Button} ${btnStyles.Delete}`} onClick = {handleCommentDelete}>
            Confirm Deletion
          </Button>
        </>
      }
      { /* Delete Modal content for deleting a review */ }
      {type === "recipe" && 
        <>
          <Button className={`${btnStyles.Button} ${btnStyles.Modal}`} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={`${btnStyles.Button} ${btnStyles.Delete}`} onClick = {handleRecipeDelete}>
            Confirm Deletion
          </Button>
        </>
      }
    </Modal.Footer>
  </Modal>
    )
}
 
export default MessageBox;