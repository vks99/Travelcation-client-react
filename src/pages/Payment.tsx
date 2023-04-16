import axios from 'axios';
import { Alert } from "reactstrap";
import {useLocation} from 'react-router-dom';
import React, { useState, useEffect } from "react";

const Payment=()=>{
    const location = useLocation();
    console.log(location.state);

    const data = location.state;
    //declaring array for state variable
    const [payment, setPayment]=useState({
        firstname: "",
        lastname: "", 
        country:"",
        city: "",
        zipcode: "",
        email: "",
        phone: "",
        cardname: "",
        cardnumber: "",
        monthYear: "",
        cvv: "",
        destinationName:"",
        destinationPrice:""

    });
    const {  cardnumber,  cvv} = payment;
    const [phoneError, setPhoneError] = useState('');
    const [cardError, setCardError] = useState('');
    const [cvvError, setCVVError] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [validate, setValidate] = useState(false);
    let checkvalidate = false;
    useEffect(() => {
        if(data){
            setPayment(prevPayment => ({
                ...prevPayment,
                destinationName: data.name,
                destinationPrice: data.price
            }));
        }
    }, [data]);
    
    const sendPaymentRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            console.log(payment);
            
            if(!(payment.phone.length === 10) ) {
                console.log('entered if loop')
                setPhoneError("Please enter a valid 10 digit phone number");
                checkvalidate=true;
            }
            if(!(cardnumber.toString().length === 16) ) {
                setCardError("Please enter a valid 16 digit card number");
                checkvalidate=true;
            }
            if(!(cvv.toString().length === 3) ) {
                setCVVError("Please enter a valid 3 digit CVV");
                checkvalidate=true;
            }
    
            if(!checkvalidate){
                //Include the destination name and price to payment
                setPayment((prevPayment) => ({
                    ...prevPayment,
                    destinationName: data.name,
                    destinationPrice: data.price
                }));
                //post method to send the payment details
                axios.post(
                    'https://travelcationserver.onrender.com/Payment', payment
                ).then((res) => {
                    if(res.data===true)
                    {
                        setSuccessMessage("Payment Done successfully!");
                        setIsOpen(true);
                    }
                    else{
                        setSuccessMessage("Payment Failed: Invalid data entered. Please check the information you have entered and try again.");
                        setIsOpen(true);
                    }
                    console.log(res.data);
                })
                console.log(payment);
                console.log(validate);
            }
        }
        catch (err){
            console.log(err);
        }
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPayment({...payment, [e.target.name]: e.target.value});
    }
    return(
        <div className="container mt-3">
            {/* card for fetching the destination package name and price */}
            <div className="row">
                <div className="col-md-8">
                    <div className='card bg-gray'>
                        <div className="card-header">
                            <h3>Destination Details</h3>         
                        </div>
                                <div className='row mt-3'>
                                    <div className="col-md-6 ml-2">
                                        <div className="form-group">
                                            <input type="text" name="destination" placeholder={data.name} className='form-control ' disabled/>
                                        </div>
                                    </div>
                                    <div className="col-md-5 mr-2">
                                        <div className="form-group">
                                            <input type="number" name="amount" placeholder={data.price} className='form-control' disabled/>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            {/* form to take the payment details */}
        <form onSubmit={sendPaymentRequest}>
           <div className="row">
             <div className="col-md-7 py-4">
                <div className="card">
                    <div className="card-header">
                        <h4>Personal Information</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">                                    
                                    <input type="text" name="firstname" placeholder='First Name' className='form-control'  onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">  
                                    <input type="text" name="lastname" placeholder='Last Name' className='form-control' onChange={handleChange}  required />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">   
                                    <input type="text" name="country" placeholder='Country' className='form-control' onChange={handleChange}  required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group"> 
                                    <input type="text" name="city" placeholder='City' className='form-control' onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">     
                                    <input type="text" name="zipcode" placeholder='Zip Code' className='form-control' onChange={handleChange}  required/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">    
                                    <input type="email" name="email" placeholder='Email' className='form-control'  onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="string" name="phone" placeholder='Phone Number' className='form-control' onChange={handleChange} required/>
                                    {phoneError && <p style={{color:'red'}}>{phoneError}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-5 py-4">
                <div className="card">
                    <div className="card-header">
                        <h4>Card Information</h4>
                        <p>Indicate details of the card from which money will be debited</p>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" name="cardname" placeholder='Enter Card Holder Name' className='form-control' onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="number" name="cardnumber" placeholder='Enter Card Number' className='form-control' onChange={handleChange} required/>
                                    {cardError && <p style={{color:'red'}}>{cardError}</p>}
                                </div>
                            </div>                        
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="MM/YY" name="monthYear" placeholder='MM/YY' className='form-control' onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="number" name="cvv" placeholder='CVV' className='form-control' onChange={handleChange} required/>
                                    {cvvError && <p style={{color:'red'}}>{cvvError}</p>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
           </div>
           <div className="row">
                <div className='col-md-12 d-flex justify-content-center'>
                    <button  type="submit" className='btn btn-primary btn-lg px-5 my-4'>Pay</button>
                </div> 
                <Alert color="success" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                {successMessage}
                </Alert>
           </div>
          
           </form> 
           {/* <div>
                <h1>{data.name}</h1>
                <p>ID: {data.price}</p>
            </div> */}
        </div>
    )
}

export default Payment;