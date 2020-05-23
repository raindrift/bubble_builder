import React, { Component } from 'react';
import Page from './Page'
import ErrorMessage from './ErrorMessage'

export default class SharePage extends Component {
  render(){
    const { takeAction, error } = this.props

    return <Page>
      <ErrorMessage error={error} takeAction={takeAction} />
      Share
    </Page>
  }
}
