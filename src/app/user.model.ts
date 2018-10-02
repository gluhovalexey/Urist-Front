export class User{
	username: string;
	email: number;
	is_active: string;
	
	constructor(obj?: any){
		this.username = obj && obj.username || null;
		this.email =  obj && obj.email || null;
		this.is_active =  obj && obj.is_active || null;
	}
}