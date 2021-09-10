// les imports importants
import React from "react";
import ReactDOM from "react-dom";
import './styles/app.css';
import './bootstrap';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import authAPI from "./services/authAPI";
import Customerpage from "./pages/Customerpage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//authAPI.setup();

const App = () => {
    return (
        <HashRouter>
        <Navbar />

        <main className="container pt-5">
            <Switch>
                <Route path="/customers/:id" component={Customerpage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/invoices/:id" component={InvoicePage} />
                <Route path="/invoices" component={InvoicesPage} />
                <Route path="/customers" component={CustomersPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </HashRouter>
    );
};
const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);