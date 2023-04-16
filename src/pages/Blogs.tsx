import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

//Importing the blogpost component
import blogPost from '../types/blogPost';

//Creating a Blog function
const Blogs=()=>{

    const [posts, setPosts] = useState<blogPost[]>([]);
    //Using the useEffect which will be called only once and provides the data to the webpage
    useEffect(() => {
      //using axios for API
        axios.get('https://travelcationserver.onrender.com/blogs')
          .then(res => {
            //storing the API result payload in the setPosts.
            setPosts(res.data)
            console.log(posts);
          }
          )
          //Storing the error and displying it in the console
          .catch(err => console.log(err));
      }, []);

      //returing the HTML code for rendering the web page.
    return(
        <div className="blogpost">
        <div className='container'>
  <div className='row'>
  <div className='col-12'>
  <h1 className='blog-title'>Exploring the Unexplored: A Journey to the Unknown</h1>
    </div>

  </div>
  <div className='row'>
    {posts.map((post, index) => (
      <div className='col-md-12 col-sm-12' key={index}>
        <div className='card mb-3'>
          <div className='card-body'>
            <h2 className='card-title'>{post.title}</h2>
            <p className='card-text'>{post.content}</p>
            <p className='card-text'>
              <small className='text-muted'>By {post.author}</small>
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
    )
}

//Exporting the Blogs and using it in the App.
export default Blogs;