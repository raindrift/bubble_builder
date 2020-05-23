import React from 'react';

import { BrowserRouter as Router } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';

import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';

import AppState from './containers/AppState';
import Layout from './components/Layout';

import './App.css';
import '../node_modules/react-vis/dist/style.css';

// import {XYPlot, LineSeries} from 'react-vis';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber,
    type: 'light',
  },
});

// const useStyles = makeStyles(theme => ({
//   root: {
//     overflow: 'auto',
//   },
// }));

function App() {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppState>
          {props =>
            <Router>
              <Layout {...props}/>
            </Router>
          }
        </AppState>
      </ThemeProvider>
    </React.Fragment>
  );



  // const data = [
  //   {x: 0, y: 8},
  //   {x: 1, y: 5},
  //   {x: 2, y: 4},
  //   {x: 3, y: 9},
  //   {x: 4, y: 1},
  //   {x: 5, y: 7},
  //   {x: 6, y: 6},
  //   {x: 7, y: 3},
  //   {x: 8, y: 2},
  //   {x: 9, y: 0}
  // ];

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //       <XYPlot height={300} width={300}>
  //         <LineSeries data={data} />
  //       </XYPlot>

  //     </header>
  //   </div>
  // );
}

export default App;
