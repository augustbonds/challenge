import React, { Component } from 'react';
import Checkbox from './Checkbox.js'
import './SymptomSelector.css'

class SymptomSelector extends Component {

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }
    
    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }

        this.props.handleSymptomsSelected(this.selectedCheckboxes);
    }

    renderCheckbox = (label) => (
        <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    )

    renderCheckboxes = () => (
        this.props.possibleSymptoms.map(this.renderCheckbox)
    )

    render () {
        return (
            <div className="SymptomSelector">
            <h2>Symptoms</h2>
            <div className="Checkboxes">{this.renderCheckboxes()}</div>
            </div>
        )
    }
}

export default SymptomSelector;