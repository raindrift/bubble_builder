import React, { Component } from 'react';
import Page from './Page'
import ErrorMessage from './ErrorMessage'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default class NewPage extends Component {
  componentDidMount(){
    this.props.takeAction('refreshGraph')
  }

  render(){
    const { takeAction, error } = this.props


    return <Page>
      <ErrorMessage error={error} takeAction={takeAction} />
      <PersonForm/>
    </Page>
  }
}


function PersonForm() {
  const [person, setPerson] = React.useState({})
  const [personErrors, setPersonErrors] = React.useState({fields: {}, text: {}})

  const addError = (field, text) => {
    personErrors.fields[field] = true
    personErrors.text[field] = text
    setPersonErrors(personErrors)
  }

  const clearError = (field) => {
    delete(personErrors.fields[field])
    delete(personErrors.text[field])
    setPersonErrors(personErrors)
  }

  const handleAdd = () => {


  }

  const handleCancel = () => {

  }

  const handleNameTextChange = (e) => {
    const name = e.target.value
    setPerson({name: name})
    if(!name.length || name.length === 0) {
      addError('name', 'Name cannot be blank')
    } else {
      clearError('name')
    }
  };

  return (
    <div>
      <TextField
        error={personErrors.fields.name}
        margin="dense"
        label="Name"
        type="text"
        variant="filled"
        fullWidth
        onChange={handleNameTextChange}
        helperText={personErrors.text.name}
      />

      <Button onClick={handleCancel} color="default" variant="contained">
        Cancel
      </Button>

      <Button onClick={handleAdd} color="primary" variant="contained">
        Add Person
      </Button>
    </div>
  )

}
