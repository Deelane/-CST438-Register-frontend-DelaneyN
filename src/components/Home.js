import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {SERVER_URL, FRONT_URL} from '../constants.js'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn:false};
  } 

	componentDidMount()
	{
		this.fetchUser();
	}
	
	  fetchUser = () => {
    console.log("FETCH");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(SERVER_URL + 'user', 
      {  
        method: 'GET', 
        headers: { 'X-XSRF-TOKEN': token }, 
        credentials: 'include'
      } )
    .then(response =>{if (response.status === 401){window.location.href = FRONT_URL + '/login';}else if (response.status === 200){this.setState({loggedIn:true})}})
    .catch(err => {
      console.error(err);
      } );
    }
    
    
	render(){
		const output = this.state.loggedIn === true ? <div><h1>Home</h1></div> : <div>             <div style={{width:'100%'}}>
                For DEBUG:  display state.
                {JSON.stringify(this.state)}
            </div></div>
		return (output);
	}
}

export default Home;