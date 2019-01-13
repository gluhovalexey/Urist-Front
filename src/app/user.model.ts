export class User{
	id: number;
	username: string;
	email: string;
	is_active: string;
	
	constructor(obj?: any){
		this.id = obj && obj.id || null;
		this.username = obj && obj.username || null;
		this.email =  obj && obj.email || null;
		this.is_active =  obj && obj.is_active || null;
	}
}