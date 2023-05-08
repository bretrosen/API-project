import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { SpotList } from './components/Spots';


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
      </Switch>
    )}
    </>
  );
}

export default App;
