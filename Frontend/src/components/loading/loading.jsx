import React, { Component } from 'react';
import logo from './pngformat.png'

class Counter extends Component {
    render() { 
        return ( 
        <div className="container-login100">
        <div className="wrap-login100">
            <img src={logo} alt="logo"/>
            <h2 style = {{margin : "auto"}} >Loading.......</h2>
        </div>
        </div>
        );
    }
}
 
export default Counter;