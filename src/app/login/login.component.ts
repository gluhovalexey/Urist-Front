import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { 
	FormControl, 
	FormGroup, 
	FormBuilder, 
	Validators,
	AbstractControl
} from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	private username: AbstractControl;
	private password: AbstractControl;
	public errorMsg: string;

	constructor(
		private router: Router,
		private authService: AuthService, 
		private fb: FormBuilder
		){
		this.loginForm = this.fb.group({
			'username': [ '', Validators.required ],
			'password': [ '', Validators.required ]
		});

		this.username = this.loginForm.controls['username'];
		this.password = this.loginForm.controls['password'];
	}

	ngOnInit() {
		this.authService.isLoggedIn() && this.router.navigate(['/admin']);
	}

	onLoginFormSubmit(elements) {
		let username = elements.username.value;
		let password = elements.password.value;
		this.onLogin(username, password)
	}

	onLogin(username: string, password: string) {
		this.authService.login(username, password).subscribe(
			result => {
				result && this.router.navigate(['/admin']);
			}, 
			error => {
				this.errorMsg = error;
			});
	}

}
