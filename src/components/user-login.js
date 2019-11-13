
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

        axios.post('http://localhost:5000/user/login', params)
            .then((res) =>{
            localStorage.setItem('token', res.data.token)
            }
            )
            .catch(err => console.log(err))
    };

    render(){

    return(
        <div>
            <h1>Login</h1>
            <form className='form-container' onSubmit={this.onSubmit.bind(this)} >
                <label>Email: </label>
                <input  name='email' type='email' placeholder='Email'
                    onChange={this.onEmailChange.bind(this) }
                    value={this.state.email} required
                /><br/>
                <label>Password: </label>
                <input  name='password' type='password' placeholder='Password'
                    onChange={this.onPasswordChange.bind(this) }
                    value={this.state.password} required
                /><br/>
                <button type='submit'>Login</button>
            </form>
        </div>

    )}
};

export default UserLogin;