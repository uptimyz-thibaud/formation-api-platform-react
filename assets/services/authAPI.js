import axios from "axios";
import jwtDecode from "jwt-decode";

let token;

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authoriztion"];
}

function authenticate(credentials) {
    return axios
        .post("http://127.0.0.1:8000/api/login_check", credentials)
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