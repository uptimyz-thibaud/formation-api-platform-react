import axios from "axios";
import jwtDecode from "jwt-decode";
import {LOGIN_API} from "../config";

let token;

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authoriztion"];
}

function authenticate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(data => {
            //je stocke le token dans mon localstorage
            window.localStorage.setItem("authToken", token);
            //on prévient axios qu'on a mtn un header par défaut sur toutes nos futures requetes HTTP
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            return (true);
        });
}

function setup() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);
        console.log(jwtData);
    }
}

export default {
    authenticate: authenticate,
    logout: logout,
    setup: setup
};