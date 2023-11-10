import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import RecipeCreateForm from "./pages/recipes/RecipeCreateForm";
import RecipePage from "./pages/recipes/RecipePage";
import RecipesPage from "./pages/recipes/RecipesPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import RecipeEditForm from "./pages/recipes/RecipeEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import ContactCreateForm from "./pages/contacts/ContactCreateForm";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import RecipeDelete from "./pages/recipes/RecipeDelete";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
  
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>'
          <NotificationContainer />
            <Switch>
              <Route exact path="/" render={() => (<RecipesPage 
                message="No results found. Adjust the search keyword." />)} />
              
              <Route exact path="/feed"  render={() => (
              <RecipesPage message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )} />
              
              <Route exact path="/bookmarks" render={() => (
              <RecipesPage message="No results found. Adjust the search keyword or like a post."
              filter={`bookmarks__owner__profile=${profile_id}&ordering=-bookmarks__created_at&`}
              />
            )} />
              
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/recipes/create" render={() => <RecipeCreateForm />} />
              <Route exact path="/recipes/:id" render={() => <RecipePage />} />
              <Route exact path="/recipes/:id/edit" render={() => <RecipeEditForm />} />
              <Route exact path="/recipes/:id/delete" render={() => <RecipeDelete />} />
              
              <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
              <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
              <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
              <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
              <Route exact path="/contacts" render={() => <ContactCreateForm />} />

              <Route render={() => <NotFound />} />
            </Switch>
          </Container>
        </div>
      
  );
}

export default App;