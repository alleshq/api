export interface Token {
	id: string;
	scopes: string[];
	access: string;
	refresh: string;
	createdAt: string;
	application: any;
}
