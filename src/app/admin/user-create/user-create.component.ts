import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	AbstractControl
} from '@angular/forms';

import { AdminService } from '../../admin.service';
import { User } from '../../user.model';

@Component({
	selector: 'app-user-create',
	templateUrl: './user-create.component.html',
	styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
	users: User[];
	userForm: FormGroup;
	private username: AbstractControl;
	private email: AbstractControl;
	private isActive: AbstractControl;
	errorMsg: string;
	
	constructor(
		private fb: FormBuilder,
		private adminService: AdminService
		) {
			this.userForm = this.fb.group({
			'username': [ '', Validators.required ],
			'email': [ '', Validators.required ],
			'is_active': ''
		});

		this.username = this.userForm.controls['username'];
		this.email = this.userForm.controls['email'];
		this.isActive = this.userForm.controls['is_active'];
		}
	/**
	 * [ngOnInit инициализация компонента]
	 */
	ngOnInit() {
		this.renderUserList();
	}
	/**
	 * [renderUserList Получение списка пользователей интерфейса администратора]
	 */
	renderUserList(): void {
		this.errorMsg = null;
		this.adminService.getUsers().subscribe(
			users  => {
				this.users = users;
			},
			error =>
			{
				this.errorMsg = error;
				this.users = null;
			});
	}

	onUserFormSubmit(elements) {
		let data = {};

		Object.keys(elements).forEach(key => {
	 		let element = elements[key];	 	

	 		switch (element.type) {
	 			case "":
	 				break;
	 			case 'checkbox':
	 			data[element.id] = element.checked ? true : false;
	 				break;
	 			default:
	 			data[element.id] = element.value;
	 				break;	 		
	 	}
	 	});
		this.onCreateUser(data);
	}

	onCreateUser(data: Object) {
		this.userForm.valid && this.adminService.createUser(data).subscribe(data => {
            this.userForm.reset();
            this.renderUserList();
        });
	}

	onEditUser() {

	}

	onDeleteUser(id) {
		this.adminService.deleteUser(id).subscribe(result => {
			this.renderUserList();
		});
	}
}
