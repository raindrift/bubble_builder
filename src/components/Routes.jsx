import React from 'react';
import { Switch, Route } from "react-router-dom";

import HomeScreen from './HomeScreen';
import NewPage from './NewPage'
import PeoplePage from './PeoplePage'
import GraphPage from './GraphPage'
import SharePage from './SharePage'

export default function Routes(props) {
  return <Switch>
    <Route
      exact
      path="/"
      component={HomeScreen}
    />
    <Route
      exact
      path="/new"
      render={() => <NewPage {...props} />}
    />
    <Route
      exact
      path="/people"
      render={() => <PeoplePage {...props} />}
    />
    <Route
      exact
      path="/graph"
      render={() => <GraphPage {...props} />}
    />
    <Route
      exact
      path="/share"
      render={() => <SharePage {...props} />}
    />
  </Switch>
}
