import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/auth/session.service';
import { User } from 'src/app/types';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	host: {
		'(document:click)': 'onClick($event)',
	},
})
export class NavbarComponent {
	constructor(
		private __session: SessionService,
		private __router: Router,
		private __eref: ElementRef
	) {}

	public user: User | null = null;
	public show: boolean = false;

	ngOnInit(): void {
		this.validateSession();
	}

	async validateSession() {
		const session = await this.__session.getSession();

		if (session) {
			this.user = session;
		}
	}

	pickup() {
		this.__router.navigate(['pickup']);
	}

	profile() {
		this.__router.navigate(['profile']);
	}

	login() {
		this.__router.navigate(['login']);
	}

	logout() {
		this.__session.logout();
	}

	toogleMenu() {
		this.show = !this.show;
	}

	onClick(event: MouseEvent) {
		if (!this.__eref.nativeElement.contains(event.target))
			// or some similar check
			this.show = false;
	}
}
