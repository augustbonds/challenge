import React, { Component } from 'react';
import './App.css';
import SymptomSelector from './SymptomSelector'
import { possibleSymptoms, classify } from './bayesian.js'
import Diagnosis from './Diagnosis';

class App extends Component {
  
  state = {
    classifiedCauses: []
  }
  
  handleSymptomsSelected = (symptoms) => {
    if (symptoms.size === 0){
      this.setState({classifiedCauses : []})
      return;
    }
    
    this.setState({classifiedCauses : classify(symptoms)} )
    
  };

  render() {
    return (
      <div className="App">
        <h1>OnlineMD</h1> 
        <p>Select your experienced symptoms for immediate diagnosis.</p>
      
        <SymptomSelector
          possibleSymptoms={Array.from(possibleSymptoms)}
          handleSymptomsSelected={this.handleSymptomsSelected}
          />
        <Diagnosis
          causes={this.state.classifiedCauses} 
          />
      </div>
    );
  }
}

export default App;
