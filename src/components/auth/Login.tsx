import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import AuthContext, { AuthContextType } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
type LoginForm = {
	password:String,
	email:String,
}

const Login=()=>{
  //set Authcontext
    const auth = useContext(AuthContext) as AuthContextType;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  //set submit form
    const { email, password } = formData;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    console.log('hello');
    let formValid = true;
    if (formValid) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = {
        email: email,
        password: password,
      };

      try {
        //connect to serverside API
        const response = await axios.post(
            'https://travelcationserver.onrender.com/login',
          data,
          config
        );
        console.log(response.data);
        console.log(response.data.token)
        //take token from serverside
        localStorage.setItem('token', response.data.token);
        auth.login();
        navigate('/');
      } catch (err: any) {
        console.log(err);
       
      }
    }
    };
    return(

		<div className="col-md-8 form-right-side p-5 ">
		<h1 className='mb-4'>Login</h1>
		<form onSubmit={onSubmit} className='row g-4'>
		<div className="col-md-6">
				<label htmlFor="Email" className='form-label'>Email</label>
				<input type="text" className='form-control' name='email' onChange={(e) => onChange(e)} placeholder='User Name' required/>
			</div>
			<div className="col-md-6">
				<label htmlFor="Password" className='form-label'>Password</label>
				<input type="password" className='form-control' name='password' onChange={(e) => onChange(e)}  required/>
			</div>
            <div className="col-12">
				<button className='button' type="submit">Login</button>
			</div>
		</form>
		</div>
    
    )   

}

export default Login;