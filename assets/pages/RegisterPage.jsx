import React, {useState} from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from "axios";
import usersAPI from "../services/usersAPI";
import {toast} from "react-toastify";

const RegisterPage = ({history}) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        setUser({...user, [name]: value });
    };
    //gestion de la soumission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            return;
        }
        try {
            await usersAPI.register(user);
            setErrors({});
            toast.success("vous êtes désormais inscrit, BRAVO LE VÔ");
            history.replace('/login')
        } catch (error) {
            const { violations } = error.response.data;
            if (violations) {

                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire");
        }
    };

    return (
        <>
            <h1>Inscription (viens vendre ton <strong>ÂME</strong>)</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Votre joli prénom"
                    errors={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                    />
                <Field
                    name="lastName"
                    label="nom de famille"
                    placeholder="Votre joli nom de famille"
                    errors={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field
                    name="email"
                    label="Adresse email"
                    placeholder="Votre joli adresse email"
                    errors={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="Votre joli mot de passe "
                    errors={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field
                    name="passwordConfirm"
                    label="mot de passe de confirmation"
                    type="password"
                    placeholder="Votre joli mot de passe de confirmation"
                    errors={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Confirmation (signe avec ton sang)
                    </button>
                    <Link to="/login" className="btn btn-link">
                        J'ai déjà un compte (On ne me la fait pas à moi)
                    </Link>
                </div>
            </form>
        </>
    );
};

export  default RegisterPage;