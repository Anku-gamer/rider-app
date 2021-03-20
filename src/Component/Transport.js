import React from 'react';
import { Link } from 'react-router-dom';
import './Transport.css';

const Transport = (props) => {
    const {name , image , id} = props.transport;
    return (
           <div className="col-sm-3">
               <div>
               <Link to = {`/destination/${id}`}>
               <img className="imageStyle" src={image} alt=""/>
               <h5>{name}</h5>               
               </Link>
               </div>
           </div> 
        
    );
};

export default Transport;