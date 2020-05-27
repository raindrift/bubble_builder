import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { map, keys, isEmpty } from 'lodash';

import { factors } from '../factors'

import Page from './Page'
import ErrorMessage from './ErrorMessage'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default class NewPage extends Component {
  componentDidMount(){
    this.props.takeAction('refreshGraph')
  }

  render(){
    const { graph, redirect, takeAction, error } = this.props
    return <Page>
      <ErrorMessage error={error} takeAction={takeAction} />
      <PersonForm takeAction={takeAction} redirect={redirect} graph={graph} />
    </Page>
  }
}


function PersonForm({graph, takeAction, redirect}) {
  const classes = useStyles()
  const [personDetails, setPersonDetails] = React.useState({name: '', job: 'wfh'})
  const [personDetailsErrors, setPersonDetailsErrors] = React.useState({fields: {}, text: {}})
  const [jobSelectError, setJobSelectError] = React.useState({isError: false, text: null})
  const [contactFrequency, setContactFrequency] = React.useState({})

  // don't render until the graph exists
  if(!graph) {
    return null
  }

  const addError = (field, text) => {
    personDetailsErrors.fields[field] = true
    personDetailsErrors.text[field] = text
    setPersonDetailsErrors(personDetailsErrors)
  }

  const clearError = (field) => {
    delete(personDetailsErrors.fields[field])
    delete(personDetailsErrors.text[field])
    setPersonDetailsErrors(personDetailsErrors)
  }

  const handleAdd = () => {
    let edges = []
    for (let nodeId of keys(contactFrequency)) {
      const days = contactFrequency[nodeId]
      if(days > 0) {
        edges.append({
          node: graph.nodesById[nodeId],
          details: {days_per_week: days},
        })
      }
    }

    if(isEmpty(personDetailsErrors.fields)) {
      takeAction('addNode', {node: personDetails, edges, redirect: '/graph'})
    }
  }

  const handleCancel = () => {
    setPersonDetails({})
    setPersonDetailsErrors({fields: {}, text: {}})
  }

  const handleNameTextChange = (e) => {
    const name = e.target.value
    setPersonDetails({...personDetails, name})
    if(!name.length || name.length === 0) {
      addError('name', 'Name cannot be blank')
    } else if(graph.nodesByName[name.toLowerCase()]) {
      addError('name', 'Name is already in use')
    } else {
      clearError('name')
    }
  }

  const handleJobSelectChange = (e) => {
    const key = e.target.value
    setPersonDetails({...personDetails, job: key})
    setJobSelectError({isError: false, text: null})
  }

  const handleFrequencyChange = (node, days) => {
    contactFrequency[node.id] = days
    setContactFrequency({...contactFrequency})
  }

  if(redirect) {
    takeAction('resetRedirect')
    return <Redirect to={redirect}/>
  }

  const jobOptions = map(keys(factors.jobs), (key) => {
    return (
      <option value={key} key={key}>{factors.jobs[key].title}</option>
    )
  })

  const personDetailsList = map(graph.nodes(), (node) => {
    return (
      <ListItem key={`node-${node.id}`} role={undefined}>
        <ListItemText primary={node.details.name} />
        <ListItemSecondaryAction>
          <TextField
            value={contactFrequency[node.id] === undefined ? 0 : contactFrequency[node.id]}
            margin="dense"
            label="days per week"
            type="text"
            variant="filled"
            onChange={(e) => handleFrequencyChange(node, e.target.value)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  })

  return (
    <div>
      <TextField
        value={personDetails.name}
        error={personDetailsErrors.fields.name}
        margin="dense"
        label="Name"
        type="text"
        variant="filled"
        fullWidth
        onChange={handleNameTextChange}
        helperText={personDetailsErrors.text.name}
      />

      <FormControl className={classes.formControl} error={jobSelectError.isError}>
        <InputLabel htmlFor="job-select">Occupation</InputLabel>
        <Select
          native
          value={personDetails.job}
          onChange={handleJobSelectChange}
          inputProps={{
            name: 'jobSelect',
            id: 'job-select',
          }}
        >
          {jobOptions}
        </Select>
        <FormHelperText>{jobSelectError.text}</FormHelperText>
      </FormControl>
      <br/>
      <List className={classes.root}>
        {personDetailsList}
      </List>
      <br/>
      <Button onClick={handleCancel} color="default" variant="contained">
        Cancel
      </Button>

      <Button onClick={handleAdd} color="primary" variant="contained">
        Add Person
      </Button>
    </div>
  )
}
