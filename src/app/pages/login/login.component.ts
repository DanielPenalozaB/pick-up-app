import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { SessionService } from 'src/app/services/auth/session.service';
import { User } from 'src/app/types';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	constructor(
		private __login: LoginService,
		private __session: SessionService,
		private __router: Router
	) {}

	public id: string = '';
	public password: string = '';
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

	login(): void {
		if (this.id && this.password) {
			this.__login.login(this.id, this.password);
		}
	}

	handleDisabled(): boolean {
		if (!this.id || !this.password) {
			return true;
		} else {
			return false;
		}
	}

	register() {
		this.__router.navigate(['register']);
	}
}
