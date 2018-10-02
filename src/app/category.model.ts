import { ServiceList } from './service-list.model';
import { DocumentList } from './document-list.model';

export class Category{
	title: string;
	slug: string;
	services: ServiceList[] = [];
	documents: DocumentList[] = [];

	constructor(obj?: any){
		this.title = obj && obj.title || null;
		this.slug = obj && obj.slug || null;
		let arr = [];
		obj && obj.services && obj.services.forEach((service) => this.services.push(new ServiceList({title: service.title, price: service.price})))
		obj && obj.services && obj.documents.forEach((document) => this.documents.push(new DocumentList({name: document.name, path: document.path, slug: document.slug})))
	}
}