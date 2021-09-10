import React, {useEffect, useState} from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import customersAPI from "../services/customersAPI";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const InvoicePage = (props) => {

    const [loading, setLoading] = useState(true);
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [customers, setCustomers] = useState([]);

    const [error, setError] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.findAll();
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response);
            toast.error("une erreur est survenue");
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    const handleChange = ({currentTarget}) => {
        const { name, value } = currentTarget;
        setInvoice({...invoice, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/invoices", {...invoice, customer: `api/customers/${invoice.customer}`});
            console.log(response);
            toast.success("l'impôt a bien été enregistré");

        } catch (error) {
            toast.error("une erreur est survenue");
            console.log(error.response);
        }
    }

    return (
        <>
            <h1>Création d'un impôt</h1>
            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={error.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={error.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.firstName} {customer.lastName}
                        </option>
                    ))}
                </Select>

                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={error.status}
                    onChange={handleChange}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Enregistrer
                    </button>
                    <Link to="/invoices" className="btn btn-link">
                        Retour aux impôts
                    </Link>
                </div>
            </form>}
            {loading && <TableLoader />}
        </>
    );
};

export default InvoicePage;