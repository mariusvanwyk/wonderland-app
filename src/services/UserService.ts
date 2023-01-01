import Keycloak from "keycloak-js";

const _kc = new Keycloak('/keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: any, onAuthenticatedErrorCallback: any) => {
    _kc.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false
    })
        .then((authenticated) => {
            if (!authenticated) {
                console.log("user is not authenticated..!");
            }
            onAuthenticatedCallback();
        })
        .catch((error) => {
            console.error(error);
            onAuthenticatedErrorCallback();
        });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback: any) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getResourceRoles = () => _kc.resourceAccess;
const getRealmRoles = () => _kc.realmAccess;

const hasRole = (roles: string[]) => roles.some((role) => _kc.hasRealmRole(role));

const isAdmin = () => isLoggedIn() && hasRole(["WONDERLAND_ADMIN", "WONDERLAND_DEVELOPER"]);

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    hasRole,
    getResourceRoles,
    getRealmRoles,
    isAdmin
};

export default UserService;
