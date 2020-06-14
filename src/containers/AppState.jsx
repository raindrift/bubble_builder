import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Graph from '../graph'

// import _ from 'lodash';

export default class AppState extends Component {
  constructor(){
    super()
    this.state = {
      ...window.initialReactState,
    }
    window.getState = () => { return this.state }
  }

  updateAppState = (newState) => {
    this.setState(newState);
  }

  takeAction = (action, ...args) => {
    //console.log('[action]', action, args)
    if (!(action in actions)) throw new Error(`unkown action ${action}`);
    actions[action].apply(this, args).catch(error => {
      console.error('[action]', action, error)
      this.setState({
        [`action:${action}:error`]: error,
      })
    })
  }

  render() {
    // console.dir(this.state);
    return this.props.children({
      ...this.state,
      takeAction: this.takeAction,
    })
  }
}

// Actions that modify the app state go here.
const actions = {

  // async loadStuff(){
  //   await loadResource.call(this, {name: 'stuff'})
  // },

  async resetRedirect() {
    this.setState({redirect: undefined})
  },

  async refreshGraph(){
    let newState = {}
    if(this.state.graph) {
      if(this.state.graphNeedsUpdate) {
        this.state.graph.resetAll()
        this.state.graph.simulate()
      }
    } else {
      newState.graph = new Graph()
    }

    newState.graphNeedsUpdate = false
    this.setState(newState)
  },

  async addNode({node, edges, redirect}){
    // edge is obj of {node, details}
    const result = this.state.graph.addNode(node)
    if(result.error) {
      this.setState({
        loading: false,
        error: result.error,
      })
    } else {
      for (let edge of edges) {
        result.node.addEdge(edge)
      }

      this.setState({
        loading: false,
        redirect: redirect,
        graphNeedsUpdate: true,
      })
    }
  },

  async resetError(){ // call when error message is closed
    this.setState({error: false})
  },

}

// TODO(raindrift): will use these later, commenting to remove warnings
// async function loadResource(options = {}){
//   let {
//     name,
//     endpoint = `/${_.snakeCase(name)}`,
//   } = options
//   if(options['id']) {
//     endpoint = `${endpoint}/${options['id']}`;
//   }
//   const capitalizedName = `${name[0].toUpperCase()}${name.slice(1)}`
//   this.setState({
//     [`loading${capitalizedName}`]: true,
//     loading: true,
//     error: undefined,
//   });
//   const response = await apiRequest('get', endpoint)
//   this.setState({
//     [`loading${capitalizedName}`]: false,
//     loading: false,
//     error: response.error,
//     [name]: response[name],
//   });
// }

// async function apiRequest(method, path, body){
//   //console.log('apiRequest', {method, path, body});
//   const response = await fetch(
//     `/api${path}`,
//     {
//       method,
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json;charset=UTF-8',
//       },
//       body: body ? JSON.stringify(body) : undefined,
//     }
//   )
//   console.log('apiRequest', {method, path, body, response})
//   return await response.json()
// }
