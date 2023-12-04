import { Injectable } from '@angular/core';
import { UserService } from '../user/get.service';
import { User } from 'src/app/types';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class SessionService {
	constructor(private __user: UserService, private __router: Router) {}

	public async getSession(redirect?: string) {
		const session = localStorage.getItem('user');

		if (session) {
			const user = await this.__user.get(session);

			if (user === 'USER NOT FOUND') {
				localStorage.removeItem('user');
			} else {
				if (redirect) this.__router.navigate([redirect]);

				let formatedUser = {
					uuid: session,
					// @ts-ignore
					name: user.name,
					// @ts-ignore
					id: user.id,
					// @ts-ignore
					email: user.email,
					// @ts-ignore
					phone: user.phone,
					// @ts-ignore
					password: user.password,
				};

				return formatedUser as User;
			}
		}

		return null;
	}

	public logout() {
		localStorage.removeItem('user');
		this.__router.navigate(['login']);
	}
}
