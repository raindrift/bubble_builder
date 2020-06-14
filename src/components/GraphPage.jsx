import React, { Component } from 'react';
import { map, isEmpty } from 'lodash';
import Page from './Page'
import ErrorMessage from './ErrorMessage'
import {InteractiveForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';

export default class GraphPage extends Component {
  componentDidMount(){
    this.props.takeAction('refreshGraph')
  }

  render(){
    const { graph, takeAction, error } = this.props

    // don't render until the graph exists
    // TODO(raindrift: replace this with a 'loading' state)
    if(!graph) {
      return null
    }

    console.dir(graph)

    const nodeList = map(graph.nodes(), (node) => {
      const riskPercent = (node.totalRisk(graph.iterations) * 100).toFixed(2)
      const label = `${node.details.name} ${riskPercent}%`
      return <ForceGraphNode node={{ id: node.id, label }} fill="red" />
    })

    const edgeList = map(graph.edges(), (edge) => {
      const nodes = [...edge.nodes]
      return <ForceGraphLink link={{ source: nodes[0].id, target: nodes[1].id }} />
    })

    if(isEmpty(nodeList)) {
      return <Page>
        Click + to add some people
      </Page>
    }

    return <Page>
      <ErrorMessage error={error} takeAction={takeAction} />
      <InteractiveForceGraph
        simulationOptions={{ height: 300, width: 300 }}
        showLabels={true}
        labelAttr='label'
      >
        {nodeList}
        {edgeList}
      </InteractiveForceGraph>
    </Page>
  }
}
