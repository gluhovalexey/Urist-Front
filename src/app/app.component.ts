import { 
	Component, 
	OnInit, 
	Input 
} from '@angular/core';
import {
	Router
}  from "@angular/router";
@Component({
	selector: 'app-urist',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public regex = /admin|login/;
	public phonesShow: boolean = true;

	constructor(private router: Router){}

	ngOnInit() {}

	onClickContactsHeader() {
		this.phonesShow = !this.phonesShow;
	}
}
