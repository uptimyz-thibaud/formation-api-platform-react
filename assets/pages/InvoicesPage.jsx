import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/invoicesAPI";
import moment from "moment";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
};

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
};

const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;

    //permet d'aller récupérer les Invoices auprès de l'API
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error.response)
        }
    };

    //au chargement du composant, on va chercher les Invoices
    useEffect(() => {
    fetchInvoices();
    }, []);

    //gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    //Gesion de la recherche
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    //gestion de la suppression d'une facture (invoices)
    const handleDelete = async id => {
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
           await InvoicesAPI.delete(id);
        } catch(error) {
            console.log(error.response);
            setInvoices(originalInvoices);
        }
    };

    //gestion du format de date
    const formatDate = str => moment(str).format("DD/MM/YYYY");

    //filtrage des clients en fonction de la recherche
    const filteredInvoices = invoices.filter(
        d =>
            d.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            d.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            d.amount.toString().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[d.status].toLowerCase().includes(search.toLowerCase())
    );

    //pagination des données
    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <h1>Liste des factures</h1>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..."/>
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th className="text-center">Date d'envoi</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>
                            <a href="#">
                                {invoice.customer.firstName} {invoice.customer.lastName}
                            </a>
                        </td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            <span
                                className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                                >
                                {STATUS_LABELS[invoice.status]}
                            </span>
                        </td>
                        <td className="text-center">
                            {invoice.amount.toLocaleString()} €
                        </td>
                        <td>
                            <button className="btn btn-sm btn-primary mr-1">Editer</button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(invoice.id)}
                                >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={invoices.length}
                onPageChanged={handlePageChange}
            />
        </>
    )
};
export default InvoicesPage;