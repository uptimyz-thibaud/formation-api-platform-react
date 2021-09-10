import React, {useState, useEffect} from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import customersAPI from "../services/customersAPI";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const Customerpage = ({match, history}) => {

    const { id = "new" } = match.params;
    const [loading, setLoading] = useState(false);

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [editing, setEditing] = useState(false);

    //récupération du client en fonction de l'identifiant
    const fetchCustomer = async id => {
        try {
            const {firstName, lastName, email, company} = await customersAPI.findAll(id);
            setCustomer({firstName, lastName, email, company});
            setLoading(false);
        } catch (error) {
            history.replace("/customers");
        }
    };
    //chargment du client si besoin au chargement du composant ou au chargement de l'identifiant
    useEffect(() => {
        if (id !== "new") {
            setLoading(true);
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);

    //gestion des changements des imputs du formulaire
    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        setCustomer({...customer, [name]: value });
    };

    //gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            setErrors({});
            if (editing) {
                await customersAPI.update(id, customer);
            } else {
                await customersAPI.create(customer);
                toast.success("le pige* client a bien été créé");
                history.replace("/customers");
            }

        } catch ({ response }) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("des erreurs dans votre formulaire");
            }
        }
    };

    return (
        <>
            {!editing && <h1>Création d'un pige* d'un client</h1> || <h1>Modification du pige$ du client</h1>}

            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de famille du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="email"
                    label="email"
                    placeholder="Adresse email du client"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="Entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Enregistrer
                    </button>
                    <Link to="/customers" className="btn btn-link">
                        Retour à la liste
                    </Link>
                </div>
            </form>}
            {loading && <TableLoader />}
        </>
    );
};

export default Customerpage;