import React, { Component } from 'react';
import './Diagnosis.css'

class Diagnosis extends Component {
    
    renderListItem = (cause) => {
        const { name, probability } = cause;

        return (
            <div className="Cause" key={name}>
                <span className="CauseName">{name}</span>
                <span className="CauseProbability">{probability.toFixed(2)}</span>
            </div>
        )
    }

    renderList = () => {
        const { causes } = this.props;
        
        return (
            <div className="Causes">
                {causes.map(this.renderListItem)}
            </div>
        )
    }
    
    render () {
        return (
            <div className="Diagnosis">
                <h2>Diagnosis</h2>
                {this.renderList()}
            </div>
        )
    }
}

export default Diagnosis;