import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { SpotList } from './components/Spots';
import { SingleSpot } from './components/SingleSpot';
import { SpotForm } from './components/CreateSpot';
import { CurrentUserSpotList} from './components/ManageSpots';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // retains session user info after a refresh
  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
     {isLoaded && (
      <Switch>
        <Route exact path='/'>
          <SpotList />
        </Route>
        <Route path='/spots/current'>
          <CurrentUserSpotList />
        </Route>
        <Route path='/spots/new'>
          <SpotForm />
        </Route>
        <Route path='/spots/:spotId'>
          <SingleSpot />
        </Route>
      </Switch>
    )}
    </>
  );
}

export default App;
