import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
//react boostrap componets
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
//styles css
import appStyles from "../../App.module.css";
import styles from "../../styles/RecipesPage.module.css";
//router
import { useLocation } from "react-router";
//API
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
//componets
import Recipe from "./Recipe";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import PopularProfiles from "../profiles/PopularProfiles";
//utils
import { fetchMoreData } from "../../utils/utils";

function RecipesPage({ message, filter = "" }) {
  // useState variables
  const [recipes, setRecipes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();
  
  useEffect(() => {
    // async function to fetch recipes
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/?${filter}search=${query}`);
        //update the setRecipes state
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };

    setHasLoaded(false);
    // Add timer to delay the fetch Recipes function by 1 sec.
    const timer = setTimeout(() => {
      fetchRecipes();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 my-2" lg={8}>
        <PopularProfiles mobile />
        {/* Search Bar filter*/} 
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search recipes"
          />
        </Form>

         {/* check if the data has been loaded first and lists posts*/} 
        {hasLoaded ? (
          <>
          {recipes.results.length ? (
          /* addnig InfinitScroll component*/
            <InfiniteScroll
              children={recipes.results.map((recipe) => (
                <Recipe key={recipe.id} {...recipe} setRecipes={setRecipes} />
              ))}
              dataLength={recipes.results.length}
              loader={<Asset spinner />}
              hasMore={!!recipes.next}
              next={() => fetchMoreData(recipes, setRecipes)}
            />
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message} />
            </Container>
          )}
        </>
           ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
      {/* addnig InfinitScroll component*/}
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default RecipesPage;