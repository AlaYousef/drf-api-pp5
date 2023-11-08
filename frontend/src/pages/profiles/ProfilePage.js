import React, { useEffect, useState } from "react";
//React boostrap component
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button, Image } from "react-bootstrap";
//styles css
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
//components
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import Recipe from "../recipes/Recipe";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
//contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData,} from "../../contexts/ProfileDataContext";
//router
import { useParams } from "react-router";
//API
import { axiosReq } from "../../api/axiosDefaults";
//utils
import { fetchMoreData } from "../../utils/utils";
//Image
import NoResults from "../../assets/no-results.png";


function ProfilePage() {
  
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileRecipes, setProfileRecipes] = useState({ results: [] });
  //Get currentUser 
  const currentUser = useCurrentUser();
  // get id from the URL 
  const { id } = useParams();
  //set popular profiles data, handleFollow, handleUnfollow  from useSetProfileData context
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  //Get popular profiles data useProfileData context
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  //check if the current is the owner
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the profile id & recipes created by the user from the API
        const [{ data: pageProfile }, { data: profileRecipes }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/recipes/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        //update the state
        setProfileRecipes(profileRecipes);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
    {/* Check if the user is the owner of the profile to display ProfileEditDropdown component */}
     {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              {/* Owner's recipes count */}
              <div>{profile?.recipes_count}</div>
              <div>Recipes Posts</div>
            </Col>
            <Col xs={3} className="my-2">
              {/* Owner's followers count */}
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              {/* Owner's following count */}
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfileRecipes = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s Recipes</p>
      <hr />
      {profileRecipes.results.length ? (
        <InfiniteScroll
          children={profileRecipes.results.map((recipe) => (
            <Recipe key={recipe.id} {...recipe} setRecipes={setProfileRecipes} />
          ))}
          dataLength={profileRecipes.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileRecipes.next}
          next={() => fetchMoreData(profileRecipes, setProfileRecipes)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileRecipes}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;