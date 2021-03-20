import React, { useState } from 'react';
import { useParams } from 'react-router';
import rideData from '../../data/data.json';

const Destination = () => {

const { id } = useParams();

const availableRides = rideData.find(ride => ride.id === parseInt(id));
const {name,image,price , images} = availableRides;
const [click, setClick] = useState(false);
const handleSubmit = (e) => {
    setClick(!click);
    e.preventDefault();
}

    return (
      <div className="row text-center m-5" >
      <div className="border col-sm-6">
          <form onSubmit={handleSubmit}>
              <div className="m-3">
                  <label>Travel Date</label>
                  <br />
                  <input type="date" className="form-control" name="date" required />
                  <br />
              </div>

              <div className="m-3 form-group">
                  <label>Pickup location</label>
                  <br />
                  <input className=" form-control" placeholder="From" type="text" name="pick" required />
                  <br />
              </div>

              <div className="m-3 form-group">
                  <label>Travel destination</label>
                  <br />
                  <input type="text" className="form-control" placeholder="To" name="dest" required />
                  <br />
              </div>
              <div className="form-group">
              <button className="btn btn-outline-warning btn-lg">Search Ride</button>
              </div>
          </form>
          
                  
      </div>
      <div className="col-sm-6">
          <iframe width="400" height="400" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=400&amp;height=400&amp;hl=en&amp;q=%20dhaka+(Map)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
      </div>
      <div>
      <div className="border col-sm-3 m-2" >
        {click && (<div>
          <div className="col-sm-3" >
            <div className="border-0" >
              <div style={{ display: 'flex' }}>
                <img style={{ width: "50px" }} src={image} alt="" />
                <p>{name}</p>
                <img style={{ width: "50px" }} src={images} alt="" />
                <p>{price}$100</p>
              </div>
            </div>

          </div>
          <div className="col-sm-3" >
            <div className="border-0" >
              <div style={{ display: 'flex' }}>
                <img style={{ width: "50px" }} src={image} alt="" />
                <p>{name}</p>
                <img style={{ width: "50px" }} src={images} alt="" />
                <p>{price}$100</p>
              </div>
            </div>

          </div>
          <div className="col-sm" >
            <div className="border-0" >
              <div style={{ display: 'flex' }}>
                <img style={{ width: "50px" }} src={image} alt="" />
                <p>{name}</p>
                <img style={{ width: "50px" }} src={images} alt="" />
                <p>{price}$100</p>
              </div>
            </div>

          </div>
        </div>)}
      </div>
                  </div>
  </div>
        
    );
};

export default Destination;