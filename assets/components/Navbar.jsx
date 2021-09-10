import React from "react";
import authAPI from "../services/authAPI";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";

const Navbar = (props) => {

    const handleLogout = () => {
        authAPI.logout();
        toast.info("Vous êtes désormais déconnecté :)");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">SymReact !</NavLink>
            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Pigeons</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Impôts</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink to="/register" className="btn btn-primary">
                            Inscription
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="btn btn-secondary">
                            Connexion !
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLogout} className="btn btn-danger">
                            Déconnexion
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;