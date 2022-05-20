import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';		
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {SERVER_URL} from '../constants.js'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

//import {useNavigate} from 'react-router-dom';

class AddStudent extends Component {
		constructor(props) {
		super(props);
		this.state = {name:'', email: '', status_code:  0};
    };
    
    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }
	
	handleSubmit = () => {
		//insert student into database
	    const token = Cookies.get('XSRF-TOKEN');
		
		//create student object for POST call request
		let student = {
			'name': this.state.name,
			'email': this.state.email,
			'status_code': this.state.status_code
			};
		
		//insert student into database
		fetch(`${SERVER_URL}/student/insert`, 
		{
        	headers: { 
				'Content-Type': 'application/json',
				'X-XSRF-TOKEN': token  
				}, 
   			method: 'POST',
			body: JSON.stringify(student)
		})
	    .then(res => {
        if (res.ok) {
          toast.success("Student successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
        } 
        else {
          toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Post http status =' + res.status);
        }})
    .catch(err => {
      toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
        
    })
		//navigate('/', { replace: true });
	}
	
    render()  { 
	  return (
	      <div >
			<AppBar position="static" color="default">
			    <Toolbar>
			       <Typography variant="h6" color="inherit">
			          Add a student - TODO ADD STYLING
			       </Typography>
			    </Toolbar>
			 </AppBar>
             <div style={{width:'100%'}}>
                For DEBUG:  display state.
                {JSON.stringify(this.state)}
            </div>
			 <div>
				 <Grid
				 	padding={5}
				 	container spacing={{xs:4}}
				 	direction = 'column'
				 	alignItems='center'
				 	justifyContent='center'
			 	 >
					 <Grid item xs={6}><TextField autoFocus fullWidth label="Name" name="name" onChange={this.handleChange}  /> </Grid>
					 <Grid item xs={6}><TextField fullWidth label="Email" name="email" onChange={this.handleChange}  /> </Grid>
					 <Grid item xs={6}><InputLabel id="status_code_select_label">Status Code</InputLabel></Grid>
					 <Grid item xs={6}>
						 <Select
						 	labelId='status_code_select_label'
						 	id='status_code_select'
						 	label="Status Code"
						 	name="status_code"
						 	onChange={this.handleChange}
						 	defaultValue={0}
						 >
							<MenuItem value={0}>0</MenuItem>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={2}>2</MenuItem>
						 </Select>
					 </Grid>
					<Grid item xs={6}>
						<Button 
						    variant="outlined" color="primary" style={{margin: 10}}
						    onClick={this.handleSubmit}
					    >
						    Add Student
						 </Button>
					 </Grid>
	 			 </Grid>
			 </div>
             <ToastContainer autoClose={1500} />   
	      </div>
	  ); 
    }
}

export default AddStudent;