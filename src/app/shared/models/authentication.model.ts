import { User } from './user.model';
import { JWT } from './jwt.model';

/**
 * Authentication Model
 */
export class Authentication {

	/**
	 * JWT Token
	 */
	jwt?: JWT;

	/**
	 * User 
	 */
	user?: User;
}
