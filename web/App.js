import React from 'react';

import './styles/app.scss'
import logo from './logo.svg'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorText: '',
            submitting: false,
            succeed: false
        }

        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    async submit() {
        const body = JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })
        this.setState({ submitting: true, errorText: '' })
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body
        })
        const status = response.status
        const data = await response.json()
        const errorText = status >= 400 && status <= 499 ? data.msg : ''
        const succeed = status === 200
        this.setState({ submitting: false, errorText, succeed })
    }

    componentDidUpdate() {
        if (this.state.succeed) {
            setTimeout(() => {
                window.alert('Login Success')
                this.setState({ succeed: false })
            }, 200)
        }
    }

    render() {
        const { email, password, errorText, submitting } = this.state

        const logoClass = submitting ? 'logo logo-spin' : 'logo'
        return (
            <div className="container">
                <div className="card">
                    <img src={logo} alt="#" className={logoClass} />
                    <div className="form-container">
                        <label className="label">E-mail address</label>
                        <input type="email" name="email" placeholder="example@appman.co.th" className="input" value={email} onChange={this.onChange}/>
                        <label className="label">Password</label>
                        <input type="password" name="password" placeholder="your password..." className="input" value={password} onChange={this.onChange} />
                        {errorText
                            ? <label className="label error">{errorText}</label>
                            : null
                        }
                        <button className="button" onClick={this.submit}>SIGN IN</button>
                    </div>
                    <div className="card-footer">
                        <a href="#" className="anchor">Forgot password?</a>
                        <a href="#" className="anchor">Create a new account</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
