import React, { useState } from "react";

import axios from 'axios';

import Carousel from 'react-bootstrap/Carousel';
//import { useHistory } from "react-router-dom";

//Creating blogpost Type
type blogPost = {
  title: String,
  author: String,
  content: String,
}

//BlogForm function
const BlogForm = () => {


  //Using the use state for the initializing the blog post.
  const [blogData, setBlogData] = useState<blogPost[]>([]);
  //using the use state for setting the success message
  // const [successMessage, setSuccessMessage] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  //const history = useHistory();

  //Using the handle submit function as async
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //logging the blog data into the console
    console.log(blogData);
    //using await for getting the repsonse through the API and storing in the blogData
    const response = await axios.post(
      'https://travelcationserver.onrender.com/blogForm',blogData
  )
  //Error handling for the blog data
  .then((res) => {
      if(res.data===true)
      {
        console.log(res.data);
      }
      else{
        console.log("Unable to submit the blog data");
      }
      console.log(res.data);
  })
  .catch((error) => {
      //Displaying the error on the console.
      console.error(error);
  });

  };

  //Using handleChange for capturing the HTML input element data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      //Using the setBlogData for holding the blogData
      setBlogData({ ...blogData, [e.target.name]: e.target.value });
    }

  //using HandleChangeTextArea for holding the text area data into the blogData.
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
};

//Returing the HTML to render webpage on the browser
//Using Carousel for the scroling
//Using the Handle submit we are submitting the form and handleSubmit will capture the data.
  return (
    <div className="container">
      <div className = "blog_images"> 
      <Carousel className='my-1'>
            <Carousel.Item>
                <img
                className="bg-img-top"
                src="/blog_bg4.jpg"
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="bg-img-top"
                src="/blog_bg3.jpg"
                alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="bg-img-top"
                src="/blog_bg2.jpg"
                alt="Fourth slide"
                />
            </Carousel.Item>
            </Carousel>
      </div>
      <div>
        <h1 className="text-center">Share your experience through blogging!</h1>
        <form onSubmit={handleSubmit} className='row g-3'>
          <div className="col-md-8">
            <label className='form-label'>Title</label>
            <input type="text" className='form-control' name='title' onChange={handleChange} placeholder='Enter Title' required />
          </div>
          <div className="col-md-8">
            <label className='form-label'>Author</label>
            <input type="text" className='form-control' name='author' onChange={handleChange} placeholder='Enter Author' required />
          </div>
          <div className="col-12">
            <label htmlFor="inputMessage" className='form-label'>Blog Content</label>
            <textarea className='form-control' rows={5} name='content' onChange={handleChangeTextArea} placeholder='Enter Content' required></textarea>
          </div>
          {/* <div className="col-12" >
            <label htmlFor="image" className='form-label'>Image:</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
          </div> */}
          <div className="col-12">
            <button className='button bg-dark' type="submit">Post Blog!</button>
          </div>
          <div className="col-12">
              <br />
          </div>
        </form>
      </div>
    </div>
  );
};

//Exporting the BlogForm component to use it in the App
export default BlogForm;
