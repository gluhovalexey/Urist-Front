import { CategoryList } from './category-list.model'

export class Service{
	title: string;
	price: number;
	slug: string;
	categories: CategoryList[] = [];

	constructor(obj?: any){
		this.title = obj && obj.title || null;
		this.price =  obj && obj.price || null;
		this.slug =  obj && obj.slug || null;
		(obj && obj.categories && obj.categories.length != 0 ) ? obj && obj.categories && obj.categories.forEach((category) => this.categories.push(new CategoryList({title: category.title, slug: category.slug}))) : this.categories = null;
	}
}
