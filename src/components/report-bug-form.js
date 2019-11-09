import React from 'react';
import axios from 'axios';

function createOptionTags(opt, idx){
    return(
        <option key={idx} value={opt}> {opt} </option>
    )
}

class ReportBugForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            severity: '',
            priority: '',
            state: '',
            resolution: '',
            shortDescription: ''
        }
    }

    componentDidMount(){
        this.setState({
            severity: 'Terminal'
        })
        // const severity = document.getElementById('select-severity');
        // severity.value = 'Risky'
    }

    onSeverityChange(e){
        this.setState({
            severity: e.target.value
        });
    }

    onPriorityChange(e){
        this.setState({
            priority: e.target.value
        })
    }

    onStateChange(e){
        this.setState({
            state: e.target.value
        })
    };

    onResolutionChange(e){
        this.setState({
            resolution: e.target.value
        })
    }

    onDescriptionChange(e){
        this.setState({
            shortDescription: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const params = {...this.state}

        console.log(params)

        axios.post('http://localhost:5000/bugs/add', params)
            .then((res) => console.log(res))
            .catch(err => console.log(err))
    };

    render(){
    const severityOptions = ['Risky', 'Unhandled', 'Terminal'];
    const priorityOptions = ['Low', 'Medium' ,'High', 'Urgent!'];
    const stateOptions = ['Open', 'Closed', 'Paused'];
    const resolutionOptions = ['Solved', 'Unsolved', 'In Progress'];

    const selectSeverity = severityOptions.map( createOptionTags )
    const selectPriority = priorityOptions.map( createOptionTags )
    const selectState = stateOptions.map( createOptionTags )
    const selectResolution = resolutionOptions.map( createOptionTags )

    const defaultSelection = <option value='' disabled >Seleccione ...</option>

    return(
        <form className='form-container' onSubmit={this.onSubmit.bind(this)} >
            <select id='select-severity' 
            value={this.state.severity} 
            name='severity' 
            onChange={this.onSeverityChange.bind(this)} 
            required>
                {defaultSelection}
                {selectSeverity}
            </select>
            <select id='select-priority' 
            value={this.state.priority} 
            name='priority' 
            onChange={this.onPriorityChange.bind(this)} 
            required>
                {defaultSelection}
                {selectPriority}
            </select>
            <select id='select-state' 
            value={this.state.state} 
            name='state' 
            onChange={this.onStateChange.bind(this)} 
            required>
                {defaultSelection}
                {selectState}
            </select>
            <select id='select-resolution' 
            value={this.state.resolution} 
            name='resolution' 
            onChange={this.onResolutionChange.bind(this)} 
            required>
                {defaultSelection}
                {selectResolution}
            </select>
            <input id='input-description'  name='shortDescription' type='text' placeholder='Description'
                onChange={this.onDescriptionChange.bind(this) }
                value={this.state.shortDescription} required
            />
            <button type='submit'>Submit new bug</button>
        </form>
    )}
};

export default ReportBugForm;