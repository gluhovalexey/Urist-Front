import { CategoryList } from './category-list.model'

export class Document{
	name: string;
	path: string;
	slug: string;
	categories: CategoryList[] = [];


	constructor(obj?: any){
		this.name = obj && obj.name || null;
		this.path = obj && obj.path || null;
		this.slug = obj && obj.slug || null;
		(obj && obj.categories && obj.categories.length != 0 ) ? obj && obj.categories && obj.categories.forEach((category) => this.categories.push(new CategoryList({title: category.title, slug: category.slug}))) : this.categories = [];
	}
}