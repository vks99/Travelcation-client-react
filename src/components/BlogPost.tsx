import React from "react";

import blogPost from '../types/blogPost';


interface BlogPostProps {
    post: blogPost;
  }

const BlogPost = (props: BlogPostProps) => {
    const { post } = props;
    return (
      <div className='blog-post'>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-title"> 
                            <h2>{post.title}</h2>
                        </div>
                        <div className="card-body">
                             <p>{post.content}</p>
                             <p>By {post.author}</p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
        
        
        
        {/* <p>Posted on {post.date.toLocaleDateString()}</p> */}
      </div>
    )
};

export default BlogPost;