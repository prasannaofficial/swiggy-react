import React,{Component} from 'react';
import './HomePage.css';

import backgroundImage from '../../img/homepage.jpeg'
import logo from '../../img/swiggy-logo.png'

const backendLink="https://sleepy-springs-24187.herokuapp.com";
// const backendLink="http://localhost:3000";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            loginMail:'',
            loginPwd:'',
            signupName:'',
            signupMail:'',
            signupPwd:'',
            showLogin:true,
            greenMessage:'',
            redMessage:'',
            formDisabled:''
        }
        this.fetchisLoggedin()
    }
    fetchisLoggedin = async () => {
        let myHeaders = new Headers();
        myHeaders.append("x-access-token", localStorage.getItem("token"));
        const response = await fetch(backendLink+"/api/isloggedin",{
            method: 'GET',
            headers: myHeaders
        });
        const json = await response.json();
        if(json.verifiedUser===true){
            this.props.history.push("/restaurants");
            return;
        }
    }
    // async function postData(url = '', data = {}) {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     return response.json(); // parses JSON response into native JavaScript objects
    // }
      
    //   postData('https://example.com/answer', { answer: 42 })
    //     .then(data => {
    //       console.log(data); // JSON data parsed by `data.json()` call
    //     });
    postLogin = async (email,password) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        const response = await fetch(backendLink+"/api/auth/login",requestOptions);
        const json = await response.json();
        console.log(json);
        if(json.loggedin===true){
            this.setState({
                greenMessage:'',
                redMessage:'',
                formDisabled:'',
                signupName:'',
                signupMail:'',
                signupPwd:''
            })
            localStorage.setItem("token",json.token);
            this.props.history.push("/restaurants");
        }
        else if(json.loggedin===false){
            this.setState({
                greenMessage:'',
                redMessage:json.message,
                formDisabled:''
            })
        }
    }
    login=()=>{
        if(this.state.formDisabled)
            return;
        let email=this.state.loginMail;
        let pwd=this.state.loginPwd;
        if(!email){
            this.setState({redMessage:"Incorrect Email ID or Password!!"})
            return;
        }
        else{
            let apos=email.indexOf("@");
            let dotpos=email.lastIndexOf(".");
            if (apos<1||dotpos-apos<2){
                this.setState({redMessage:"Incorrect Email ID or Password!!"})
                return;
            }
        }
        if(!pwd){
            this.setState({redMessage:"Incorrect Email ID or Password!!"})
            return;
        }
        this.setState({
            greenMessage:'Please wait',
            redMessage:'',
            formDisabled:'disabled'
        })
        this.postLogin(email,pwd);
    }
    postSignUp = async (name,email,password) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("name", name);
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        const response = await fetch(backendLink+"/api/auth/signup",requestOptions);
        const json = await response.json();
        if(json.userInserted===true){
            this.setState({
                greenMessage:json.message,
                redMessage:'',
                formDisabled:'',
                signupName:'',
                signupMail:'',
                signupPwd:''
            })
            localStorage.setItem("token",json.token);
            this.props.history.push("/restaurants");
        }
        else if(json.userInserted===false){
            this.setState({
                greenMessage:'',
                redMessage:json.message,
                formDisabled:''
            })
        }
    }
    signup=()=>{
        if(this.state.formDisabled)
            return;
        let name=this.state.signupName;
        let email=this.state.signupMail;
        let pwd=this.state.signupPwd;
        if(!name){
            this.setState({redMessage:"Please enter your name!!!"})
            return;
        }
        if(!email){
            this.setState({redMessage:"Please enter your email!!!"})
            return;
        }
        else{
            let apos=email.indexOf("@");
            let dotpos=email.lastIndexOf(".");
            if (apos<1||dotpos-apos<2){
                this.setState({redMessage:"Please enter valid email!!!"})
                return;
            }
        }
        if(!pwd){
            this.setState({redMessage:"Please enter the pasword!!!"})
            return;
        }
        this.setState({
            greenMessage:'Please wait',
            redMessage:'',
            formDisabled:'disabled'
        })
        this.postSignUp(name,email,pwd);
    }
    loginMailonChange=(event)=>{
        this.setState({loginMail:event.target.value})
    }
    loginPwdonChange=(event)=>{
        this.setState({loginPwd:event.target.value})
    }
    signupNameonChange=(event)=>{
        this.setState({signupName:event.target.value})
    }
    signupMailonChange=(event)=>{
        this.setState({signupMail:event.target.value})
    }
    signupPwdonChange=(event)=>{
        this.setState({signupPwd:event.target.value})
    }
    render(){
        return(
            <div className="homepage-container" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.4),rgba(0,0,0,0.4)),url(${backgroundImage})`}}>
                <div className="homepage">
                    <div className="heading-container">
                        <img className="logo-image" src={logo}/>
                        <div className="buttons">
                            <a className="login-btn"
                                onClick={
                                    ()=>{
                                        if(this.state.disabled)
                                            return;
                                        this.setState({
                                            showLogin:true,
                                            greenMessage:'',
                                            redMessage:''
                                        })
                                    }
                                }
                            >Login</a>
                            <a className="signup-btn"
                                onClick={
                                    ()=>{
                                        this.setState({
                                            showLogin:false,
                                            greenMessage:'',
                                            redMessage:''
                                        })
                                    }
                                }
                            >Sign Up</a>
                        </div>
                    </div>
                    <fieldset disabled={this.state.formDisabled}>
                    <div className="form-wrapper">
                        <div className="form-container">
                            {
                                this.state.showLogin
                                ?   <>
                                        <div className="heading">LOGIN</div>
                                        <label for="email">Email</label>
                                        <input id="email" className="input-field" type="email" value={this.state.loginMail} onChange={(event)=>this.loginMailonChange(event)}/>
                                        <label for="password">Password</label>
                                        <input id="password" className="input-field" type="password" value={this.state.loginPwd} onChange={(event)=>this.loginPwdonChange(event)}/>
                                        <div className="button" onClick={this.login}>Login</div>
                                    </>
                                :   <>
                                        <div className="heading">SIGN UP</div>
                                        <label for="name">Name</label>
                                        <input id="name" className="input-field" type="text" value={this.state.signupName} onChange={(event)=>this.signupNameonChange(event)}/>
                                        <label for="email">Email</label>
                                        <input id="email" className="input-field" type="email" value={this.state.signupMail} onChange={(event)=>this.signupMailonChange(event)}/>
                                        <label for="password">Password</label>
                                        <input id="password" className="input-field" type="password" value={this.state.signupPwd} onChange={(event)=>this.signupPwdonChange(event)}/>
                                        <div className="button" onClick={this.signup}>Sign Up</div>
                                    </>
                            }
                            <div style={{marginTop:"15px",color:"#6bff6b",fontSize:"19px"}}>{this.state.greenMessage}</div>
                            <div style={{marginTop:"15px",color:"red",fontSize:"19px"}}>{this.state.redMessage}</div>
                        </div>
                    </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default HomePage;