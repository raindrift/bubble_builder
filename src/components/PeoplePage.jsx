import React, { Component } from 'react';
import Page from './Page'
import ErrorMessage from './ErrorMessage'

export default class PeoplePage extends Component {
  render(){
    const { takeAction, error } = this.props

    return <Page>
      <ErrorMessage error={error} takeAction={takeAction} />
      People
    </Page>
  }
}
