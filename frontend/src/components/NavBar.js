import React from "react";
//React boostrap component
import { Navbar, Container, Nav } from "react-bootstrap";
//assets folder
import logo from "../assets/logo.png";
//styles css
import styles from "../styles/NavBar.module.css";
//Router
import { NavLink } from "react-router-dom";
//Contexts
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
//components
import Avatar from "./Avatar";
//API
import axios from "axios";
//hooks
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
// utils
import { removeTokenTimestamp } from "../utils/utils";

function NavBar() {
  // Get the currentUser and setCurrentUser from the CurrentUserContext
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  //  handles toggling the state based on clicks outside an element.
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    // send post request to logging user out
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      //console.log(err);
    }
  };
  // add recipe icon variable
  const addRecipeIcon = (
    <NavLink to="/recipes/create" className={styles.NavLink} activeClassName={styles.Active} >
        <i className="fa-solid fa-plus"></i> New Recipe
    </NavLink>
  )
  // logged in icons
  const loggedInIcons = <>
    <NavLink to="/feed" className={styles.NavLink} activeClassName={styles.Active} >
      <i className="fa-solid fa-bars-staggered"></i> Feed
    </NavLink>

    <NavLink to="/bookmarks" className={styles.NavLink} activeClassName={styles.Active} >
      <i className="fa-solid fa-bookmark"></i> Bookmarked
    </NavLink>

    <NavLink to="/" className={styles.NavLink} onClick={handleSignOut}>
      <i className="fa-solid fa-right-from-bracket"></i> Sign out
    </NavLink>

    <NavLink to={`/profiles/${currentUser?.profile_id}`} className={styles.ProfileNavLink} >
     <Avatar src={currentUser?.profile_image} height={45} text="profile"/>
    </NavLink>

    <NavLink to="/contacts" className={styles.NavLink} activeClassName={styles.Active}>
      <i className="fa-solid fa-envelope"></i>Contact us
    </NavLink>
  </>
  
  // logged out icons
  const loggedOutIcons = (
    <>
      <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active} >
        <i className="fas fa-sign-in-alt"></i> Sign in
      </NavLink>
      <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active} >
        <i className="fas fa-user-plus"></i> Sign up
      </NavLink>
            
    </>
  )

  return (
    <Navbar expanded={expanded} className={styles.NavBar}  fixed="top" expand="md">
      <Container>

        <NavLink to="/">
          <Navbar.Brand><img src={logo} alt='logo' height='60' width='65'/></Navbar.Brand>
         
        </NavLink>
        {currentUser && addRecipeIcon}
        <Navbar.Toggle aria-controls="navbarScroll"  onClick={() => setExpanded(!expanded)} ref={ref}/>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ml-auto text-left justify-content-center">
              
              <NavLink to="/" className={styles.NavLink} activeClassName={styles.Active} > <i className="fas fa-home"></i> Home</NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>

      </Container>
    </Navbar>
   
  )
}

export default NavBar