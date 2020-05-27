import React, { Component } from 'react';
import Page from './Page'
import ErrorMessage from './ErrorMessage'

export default class GraphPage extends Component {
  componentDidMount(){
    this.props.takeAction('refreshGraph')
  }

  render(){
    const { graph, takeAction, error } = this.props

    console.dir(graph)
    return <Page>
      <ErrorMessage error={error} takeAction={takeAction} />
      Graph
      <pre>
        {JSON.stringify(graph)}
      </pre>
    </Page>
  }
}
