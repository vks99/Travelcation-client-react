// Importing required libaries
import { NavLink } from 'react-router-dom';
import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from "reactstrap";

// declaring type for formdata state variable
type PostType = {
    fullName: string;
    email: string;
    subject: string;
    message: string;
};

// creating contact us function/component
const Contactus=()=>{

    // creating state variables
    const [formData, setFormData] = useState<PostType[]>([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // creating function for submit button
    const onSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        // calling api after cliking submit button
        const response = await axios.post(
            'https://travelcationserver.onrender.com/contactus',formData
        )
        .then((res) => {
            if(res.data===true)
            {
                setSuccessMessage("Form submitted successfully!");
                setIsOpen(true);
            }
            else{
                setSuccessMessage("Form Submission Failed: Invalid data entered. Please check the information you have entered and try again.");
                setIsOpen(true);
            }
            console.log(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // creating function for any changes in form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // creating function for any changes in textarea field
    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return(
        <div className='contact-form'>
        <div className="container-fluid p-5">
            <div className="contact-form shadow rounded mt-5 contact-form">
                <div className="row">
                    <div className="col-md-4 form-left-side p-5  text-white">
                        <h2 className='mb-4'>Let's Get in touch</h2>
                        <p>We're for any suggestion or just to have a chat</p>
                        <div className="contact-us">
                            <div className="address d-flex align-items-center mb-4">
                                <i className='fa-solid fa-location-dot icon'></i>
                                <p><b>Address : </b>7245 Delmonte Crescent</p>
                            </div>
                            <div className="phone d-flex align-items-center mb-4">
                                <i className='fa-solid fa-phone icon'></i>
                                <p><b>Phone : </b>+1 4375330356</p>
                            </div>
                            <div className="Email d-flex align-items-center mb-4">
                                <i className='fa-solid fa-envelope icon'></i>
                                <p><b>Email : </b>TarvelCation@gmail.com</p>
                            </div>
                            <div className="website d-flex align-items-center mb-4">
                                <i className='fa-solid fa-earth-asia icon'></i>
                                <p><b>Website : </b>TarvelCation.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 form-right-side p-5 ">
                        <h2 className='mb-4'>Get in touch</h2>
                        <form onSubmit={onSubmit} className='row g-3'>
                            <div className="col-md-6">
                                <label htmlFor="FullName" className='form-label'>Full Name</label>
                                <input type="text" className='form-control' name='fullName' onChange={handleChange} placeholder='Name' required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Email" className='form-label'>Email</label>
                                <input type="email" className='form-control' name='email' onChange={handleChange} placeholder='Email' required/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputSubject" className='form-label'>Subject</label>
                                <input type="text" className='form-control' name='subject' onChange={handleChange} placeholder='Subject'/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputMessage" className='form-label'>Message</label>
                                <textarea className='form-control' rows={6} name='message' onChange={handleChangeTextArea} placeholder='Message' required></textarea>
                            </div>
                            <div className="col-12">
                                <button className='button' type="submit">Send Message</button>
                            </div>
                            <Alert color="success" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                                {successMessage}
                            </Alert> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

// exporting the component
export default Contactus;