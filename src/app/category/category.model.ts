import { Service } from './service.model';
import { Document } from '../document-list/document.model';
import 'rxjs/add/operator/map';

export class Category{
	title: string;
	slug: string;
	services: Service[] = [];
	documents: Document[] = [];

	constructor(obj?: any){
		this.title = obj && obj.title || null;
		this.slug = obj && obj.slug || null;
		let arr = [];
		obj && obj.services && obj.services.forEach((service) => this.services.push(new Service({title: service.title, price: service.price})))
		obj && obj.services && obj.documents.forEach((document) => this.documents.push(new Document({name: document.name, path: document.path, slug: document.slug})))
	}
}
