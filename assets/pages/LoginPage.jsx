import React, {useState} from "react";
import authAPI from "../services/authAPI";
import Field from "../components/forms/Field";

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
                <Field
                    label="Adresse email"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Adresse email de connexion"
                    error={error}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    error=""
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Je me connecte</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;
