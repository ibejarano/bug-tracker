
import React from 'react';
import axios from 'axios';

class UserLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChange(e){
        this.setState({
            password: e.target.value,
        })
    };

    onSubmit(e){
        e.preventDefault();

        const params = {...this.state}

        console.log(params)

        axios.post('http://localhost:5000/user/login', params)
            .then((res) => console.log(res))
            .catch(err => console.log(err))
    };

    render(){

    return(
        <form className='form-container' onSubmit={this.onSubmit.bind(this)} >
            <input  name='email' type='email' placeholder='Email'
                onChange={this.onEmailChange.bind(this) }
                value={this.state.email} required
            />
            <input  name='password' type='password' placeholder='Password'
                onChange={this.onPasswordChange.bind(this) }
                value={this.state.password} required
            />
            <button type='submit'>Login</button>
        </form>
    )}
};

export default UserLogin;