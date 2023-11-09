import React from 'react';
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";
import NoResults from "../assets/no-results.png";

//Not found error page
const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message={`Sorry, the page you're looking for doesn't exist`}
      />
    
    </div>
  )
}

export default NotFound