import React, {useState} from "react";
import authAPI from "../services/authAPI";

const LoginPage = props => {

    const [credentials, setCredentials] = useState( {
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    //gestion des champs
    const handleChange = ({currentTarget}) => {
        const value = currentTarget.value;
        const name = currentTarget.name;

        setCredentials({...credentials, [name]: value})
    }
    //gestion des submits
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await authAPI.authenticate(credentials);
            setError("");
        }catch(error) {
            console.log(error.response);
            setError("Aucun compte ne possède les informations que vous avez rentrées, donc bonjour monsieur le fantome! ps: les fantomes ne sont pas autorisés sur ce site, déso:/")
        }
        console.log(credentials);
    }

    return (
        <>
            <h1>Connexion à l'application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        type="email"
                        placeholder="Adresse email de connexion"
                        name="username"
                        id="username "
                        className={"form-control" + (error && " is-invalid")}/>
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="mot de passe"
                        name="password"
                        id="password"
                        className="form-control"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Je me connecte</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;
