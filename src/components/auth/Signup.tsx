import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextType } from '../../context/AuthContext';

const Signup=()=>{
	//set AuthContext
	const auth = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [formData2, setFormData] = useState({
    name: '',
    email: '',
	phone : '',
	address:'',
    password: '',
    password2: '',
  });

  const { name, email, password, address,phone } = formData2;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData2, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  //set submit form
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let data = {
      name: name,
      email: email,
      password: password,
	  address:address,
	  phone:phone,
    };
    try {
	//connect to serverside API 
      const response = await axios.post(
        'https://travelcationserver.onrender.com/register',
        data,
        config
      );
	//save token and redirect to destination page
      localStorage.setItem('token', response.data.token);
      auth.login();
      navigate('/Destination');
    } catch (e: any) {
      console.log('error ', e.message);
    }
    };
    return(

		<div className="col-md-8 form-right-side p-5 ">
		<h1 className='mb-4'>Sign UP</h1>
		<form onSubmit={onSubmit} className='row g-4'>
		<div className="col-md-6">
				<label htmlFor="User Name" className='form-label'>User Name</label>
				<input type="text" className='form-control' name='user_name' onChange={(e) => onChange(e)} placeholder='User Name' required/>
			</div>
			<div className="col-md-6">
				<label htmlFor="Password" className='form-label'>Password</label>
				<input type="password" className='form-control' name='password' onChange={(e) => onChange(e)}  required/>
			</div>
			<div className="col-md-6">
				<label htmlFor="Name" className='form-label'>Name</label>
				<input type="text" className='form-control' name='name' onChange={(e) => onChange(e)} placeholder='Name' required/>
			</div>
			<div className="col-md-6">
				<label htmlFor="Email" className='form-label'>Email</label>
				<input type="email" className='form-control' name='email' onChange={(e) => onChange(e)} placeholder='Email' required/>
			</div>
			<div className="col-md-6">
				<label htmlFor="Phone" className='form-label'>Phone</label>
				<input type="phone" className='form-control' name='phone' onChange={(e) => onChange(e)}  placeholder='Phone' required/>
			</div>
			<div className="col-md-12">
				<label htmlFor="Address" className='form-label'>Address</label>
				<input type="text" className='form-control' name='address' onChange={(e) => onChange(e)} placeholder='address' required/>
			</div>
			<div className="col-12">
				<button className='button' type="submit">Sign UP</button>
			</div>
		</form>
		</div>
    
    )   

}

export default Signup;
