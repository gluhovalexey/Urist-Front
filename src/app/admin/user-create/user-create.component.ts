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
	private users: User[];
	private userForm: FormGroup;
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

	onUserFormSubmit() {

	}

	onEditUser() {

	}

	onDeleteUser() {
		
	}
}
