import { UserManager, UserManagerSettings } from 'oidc-client';
import store from '../store';
export class IdentityService {
    private _manager: UserManager;
    constructor() {
        this._manager = new UserManager(CLIENT_SETTINGS);
        this._manager.getUser().then(user => {
            store.commit('setUser', user);
        });
    }
    public login() {
        return this._manager.signinRedirect();
    }
    public async completeAuthentication() {
        const user = await this._manager.signinRedirectCallback();
        store.commit('setUser', user);
    }
    public async logout() {
        this._manager.signoutRedirect();
    }
}

export const CLIENT_SETTINGS: UserManagerSettings = {
    authority: 'http://localhost:5000',
    client_id: 'spa',
    redirect_uri: 'http://localhost:8080/auth-callback',
    post_logout_redirect_uri: 'http://localhost:8080',
    response_type: 'id_token token',
    scope: 'openid profile vsi.api'
};
