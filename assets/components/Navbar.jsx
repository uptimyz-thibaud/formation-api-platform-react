import React from "react";

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">SymReact !</a>
            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pigeons</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Impôts</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="#" className="btn btn-primary">
                            Inscription
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-secondary">
                            Connexion !
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-danger">
                            Déconnexion
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;