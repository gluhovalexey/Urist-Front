export class Service{
	title: string;
	price: number;

	constructor(obj?: any){
		this.title = obj && obj.title || null;
		this.price =  obj && obj.price || null;
	}
}
