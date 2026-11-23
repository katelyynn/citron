export interface WallEntry {
	id: string;
	type: string;
	action: string;
	artists?: string[];
	albums?: string[];
	songs?: string[];
	users?: string[];
	comments?: string[];
	created: string;
}
