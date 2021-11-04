import { Injectable } from '@angular/core';
import { Authentication } from './../models/authentication.model';
import { User } from './../models/user.model';
import { JWT } from './../models/jwt.model';

/**
 * Authentication Service provides operation on authentication of the user in application.
 */
@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	static readonly AUTHENTICATION: string = "AUTHENTICATION";

	static readonly AUTHENTICATION_USER_LOGIN: string = "user";

	static readonly AUTHENTICATION_USER_PASSWORD: string = "Passw0rd";

	/**
	 * Constructor
	 *
	 * @public
	 * @returns void
	 */
	constructor() {
		/**
		 * The Authentication stores Authentication model with information about user authentication in application in local storage, which stores string data
		 * To recieve then in is required to parse then to save the parsing time we are also holding it as attribute on object.
		 */
	}

	/**
	 * Authentication Service isAutheticate method determines if user is authenticated in application.
	 *
	 * @public
	 * @returns boolean
	 */
	public isAuthenticated(): boolean {
		return (window.localStorage.getItem(AuthenticationService.AUTHENTICATION) == null) ? false : true;
	}

	/**
	 * Authentication Service authenticate verify user identity and returns true or false
	 * This method mocks the user authentication and not invoke API call and implements REQ. 3  
	 * 
	 * @public
	 * @param {string} login :  User login
	 * @param {string} password : User password 
	 * @returns Promise<Authentication>
	 */
	public autheticate(login: string | undefined, password: string | undefined): Promise<Authentication> {

		return new Promise((resolve, reject) => {

			/**
			 * Here should be API call for authentication which resolve Authentication Model class
			 */
			if (login === AuthenticationService.AUTHENTICATION_USER_LOGIN && password === AuthenticationService.AUTHENTICATION_USER_PASSWORD) {
				let authentication = new Authentication();

				authentication.jwt = new JWT();
				authentication.jwt.accessToken = "tmp-access-token";
				authentication.jwt.expiresAt;

				authentication.user = new User();
				authentication.user.login = login;
				authentication.user.firstname = "Firstname";
				authentication.user.lastname = "lastname";

				this.setAuthentication(authentication);
				resolve(authentication);
			}
			else {
				reject();
			}
		});
	}

	logout(): Promise<null> {
		return new Promise((resolve, reject) => {
			window.localStorage.clear();
			resolve(null);
		});
	}

	/**
	 * Sets Athentication model to local storage
	 *
	 * @private
	 * @param {Authentication} authentication: Authentication model
	 * @returns void
	 */
	private setAuthentication(authentication: Authentication): void {
		window.localStorage.setItem(AuthenticationService.AUTHENTICATION, JSON.stringify(authentication));
	}

	/**
	 * Gets Athentication model from local storage
	 * 
	 * @public
	 * @returns Authentication|undefined
	 */
	public getAuthentication(): Authentication | undefined {
		let authenticationJson = window.localStorage.getItem(AuthenticationService.AUTHENTICATION);
		if (authenticationJson !== null) {
			return JSON.parse(authenticationJson);
		}
		return undefined;
	}

	/**
	 * Gets User model from local storage
	 * 
	 * @public
	 * @returns User|unefined
	 */
	public getUser(): User | undefined {
		let authentication = this.getAuthentication();
		if (typeof authentication !== "undefined") {
			return authentication.user;
		}
		return undefined;
	}
}