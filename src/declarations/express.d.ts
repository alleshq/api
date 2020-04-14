import {Token} from "./types";

export {};

declare global {
	namespace Express {
		interface Request {
			user?: any;
			token?: Token;
			application?: any;
		}
	}
}