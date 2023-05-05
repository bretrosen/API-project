import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Switch } from "react-router-dom";
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';

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
      </Switch>
    )}
    </>
  );
}

export default App;
