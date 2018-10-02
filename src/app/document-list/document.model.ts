import { Category } from '../category/category.model';

export class Document{
	name: string;
	path: string;
	slug: string;

	constructor(obj?: any){
		this.name = obj && obj.name || null;
		this.path = obj && obj.path || null;
		this.slug = obj && obj.slug || null;
	}
}
