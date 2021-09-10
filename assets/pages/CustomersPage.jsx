import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI"
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    //permet d'aller récupérer les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
            toast.error("une erreur est survenue lors du chargement des pige* clients");
        }
    };

    //au chargement du composant, on va chercher les customers
    useEffect(() => {
    fetchCustomers();
    }, []);

    //gestion de la suppression d'un client (customer)
    const handleDelete = async id => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));
        try {
           await CustomersAPI.delete(id)
            toast.error("le PIGEON (faut assumer un peu au bout d'un moment) a été supprimé");
        } catch(error) {
            setCustomers(originalCustomers);
            toast.error("imposible de surrpimer les pige* les clients");
        }
    };

    //gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    //Gesion de la recherche
    const handleSearch = event => {
        event.currentTarget.value;
        setSearch(event.currentTarget.value);
    };

    const itemsPerPage = 10;

    //filtrage des clients en fonction de la recherche
    const filteredCustomers = customers.filter(
        d =>
            d.firstName.toLowerCase().includes(search.toLowerCase()) ||
            d.lastName.toLowerCase().includes(search.toLowerCase()) ||
            d.email.toLowerCase().includes(search.toLowerCase()) ||
            (d.company && d.company.toLowerCase().includes(search.toLowerCase()))
    );

    //pagination des données
    const paginatedCustomers = filteredCustomers.length > itemsPerPage ? Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    ) : filteredCustomers;

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="/customers/new" className="btn btn-primary">Créer un pige* un client</Link>
            </div>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..."/>
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Factures</th>
                    <th className="text-center">Montant total</th>
                    <th></th>
                </tr>
                </thead>

                {!loading && <tbody>
                {paginatedCustomers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>
                            <Link to={"/customers/" + customer.id}>
                                {customer.firstName} {customer.lastName}
                            </Link>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">
                            <span className="badge badge-primary">
                                {customer.invoices.length}
                            </span>
                        </td>
                        <td className="text-center">
                            {customer.totalAmount.toLocaleString()} €
                        </td>
                        <td>
                            <button
                                onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-danger"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>}
            </table>
            {loading && <TableLoader />}

            {itemsPerPage < filteredCustomers.length && (
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredCustomers.length}
                    onPageChanged={handlePageChange}
                />
            )}
        </>
    )
};
export default CustomersPage;