import axios from "axios";
import UserService from "./UserService";

const HttpMethods = {
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
};

const _axios = axios.create({
    baseURL: "https://127.0.0.1:8443/wonderland-services"
});

const configure = () => {
    _axios.interceptors.request.use((config) => {
        if (UserService.isLoggedIn()) {
            const cb = () => {
                config.headers.Authorization = `Bearer ${UserService.getToken()}`;
                return Promise.resolve(config);
            };
            return UserService.updateToken(cb);
        }
    });
};

const getAxiosClient = () => _axios;

const HttpService = {
    HttpMethods,
    configure,
    getAxiosClient,
};

export default HttpService;
