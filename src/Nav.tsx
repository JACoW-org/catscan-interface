import React from 'react';
import {Pages} from "./App";
import './Nav.css';

type NavProps = {
    page: Pages,
    changePage: (page: Pages) => void
}

const Nav: React.FC<NavProps> = (props) => {
    return <div className="nav-area">
        <div className="container">
            <div className="navbar navbar-expand-lg">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarContent"
                        aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${props.page === Pages.Upload ? "active" : ""}`}>
                            <button onClick={(e) => props.changePage(Pages.Upload)} className="nav-link"
                                    type={"button"}>Validator
                            </button>
                        </li>
                        <li className={`nav-item ${props.page === Pages.Resources ? "active" : ""}`}>
                            <button onClick={(e) => props.changePage(Pages.Resources)}
                                    className="nav-link"
                                    type={"button"}>Resources
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>;
}

export default Nav;
