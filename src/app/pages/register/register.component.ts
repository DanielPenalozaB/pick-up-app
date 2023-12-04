import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateService } from 'src/app/services/user/create.service';
import { User } from '../../types';
import { SessionService } from 'src/app/services/auth/session.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	constructor(private router: Router, private __user: CreateService, private __session: SessionService) {}

	public name: string = 'Humpty Dumpty';
	public id: string = '7521475';
	public phone: number = 310852741;
	public email: string = 'humpty@dumpty.com';
	public password: string = 'farawayland';
	public user: User | null = null;

	ngOnInit(): void {
		this.validateSession();
	}

	async validateSession() {
		const session = await this.__session.getSession('pickup');

		if (session) {
			this.user = session;
		}
	}

	public submit() {
		const user: User = {
			name: this.name,
			id: this.id,
			phone: this.phone,
			email: this.email,
			password: this.password,
		};

		this.__user.create(user);
	}

	login() {
		this.router.navigate(['login']);
	}
}
