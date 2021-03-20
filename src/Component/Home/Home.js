import React, { useState , useEffect} from 'react';
import data from '../../data/data.json';
import Transport from '../Transport';
import './Home.css';

const Home = () => {
    const [transports , setTransport] = useState([]);
    useEffect (() => {
        setTransport (data);
    },[]);

    return (
        <div className="homeStyle"> 
           <div className="row">
           {
               transports.map(transport => <Transport transport={transport} ></Transport>)
           }
           </div>
        </div>
    );
};

export default Home;