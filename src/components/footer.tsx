import { NavLink } from 'react-router-dom';

const Footer=()=>{
    return( 
      <div className="bg-dark py-3">
      <div className="container text-white">
        <div className="row">
          <div className="col-md-4">
            <span className="text-muted">Follow Us:</span>
            <br/>
            <a href="#">
              <i className="fab fa-facebook-square fa-2x mx-3"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter-square fa-2x mx-3"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram fa-2x mx-3"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin fa-2x mx-3"></i>
            </a>
            
          </div>
          <div className="col-md-4">
            <span className="text-muted">Contact Us:</span>
            <br/>
            <i className="fas fa-phone fa-2x mx-3"></i>
            <a href="tel:+16478368653">(647) 836-8653</a>
            <br/>
            <i className="fas fa-envelope fa-2x mx-3"></i>
            <a href="mailto:info@travel.com">info@travel.com</a>
          </div>
          <div className="col-md-4">
            <span className="text-muted">Visit Us:</span>
            <br/>
            <i className="fas fa-map-marker-alt fa-2x mx-3"></i>
             #205, Humber College, Canada
          </div>
        </div>
      </div>
    </div>
    )
}

export default Footer;