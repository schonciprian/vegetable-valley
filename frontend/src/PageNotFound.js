import React from 'react';
import './stylesheet/PageNotFound.css'
import forest from './image/page_not_found/forest2.png'
import {Link} from "react-router-dom";

function PageNotFound(props) {
    return (
        <div className="pageNotFound" style={{color: 'darkorange', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '50px'}}>
            <div className="pageNotFound-container">
                <div className="text-container">
                    <div className="text-header">
                        <span>O</span>
                        <span>o</span>
                        <span>p</span>
                        <span>s</span>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                        <div className="number">404</div>
                    </div>

                    <div className="text-body">It looks like, you are lost!</div>

                    <Link className="backToMain" to="/">Back to home page</Link>
                </div>
                {/*<div className="image-container">*/}
                    <img src={forest} alt=""/>
                {/*</div>*/}
            </div>
        </div>
    );
}

export default PageNotFound;
