import { NavLink } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//set history form
type order = {
    lastname: string;
    destinationName: string;
    destinationPrice:string;
    country:string;
}

const History=()=>{
    const [posts, setPosts] = useState<order[]>([]);
    //connect to serverside API to get histroy data
    useEffect(() => {
      axios.get('https://travelcationserver.onrender.com/history')
        .then(res => {
          setPosts(res.data)
          console.log(posts);
        }
        )
        .catch(err => console.log(err));
    }, []);
    // show the history
    return (

        <div className="container">
            <div className = "travel_images">
            <Carousel className='my-1'>
            <Carousel.Item>
                <img
                className="bg-img-top"
                src="travel.jpg"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="bg-img-top"
                src="travel1.jpg"
                alt="Second slide"
                />
            </Carousel.Item>
            </Carousel>
      </div>
            <div className="card-header">
                        <h4>Your order history</h4>
            </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Order Name:</th>
              <th>Destination:</th>
              <th>Departure:</th>
              <th>Price:</th>
            </tr>
          </thead>
          <tbody>
          {posts.map((post, index) => (
            <tr>
              <td>{index +1}</td>
              <td>{post.lastname}</td>
              <td>{post.destinationName}</td>
              <td>{post.country}</td>
              <td>{post.destinationPrice}</td>
            </tr>
             ))}
          </tbody>
        </Table>
        </div>
      );
    }

export default History;