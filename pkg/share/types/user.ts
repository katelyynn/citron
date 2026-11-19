export interface Me {
	id: string;
	name: string;
	avatar?: string;
	about?: string;
	created: string;
	pronouns: {
		personal?: string;
		possessive?: string;
	}
}
