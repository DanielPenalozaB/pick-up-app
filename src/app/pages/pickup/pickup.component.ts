import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { StudentService } from 'src/app/services/student/student.service';
import { User } from 'src/app/types';

@Component({
	selector: 'app-pickup',
	templateUrl: './pickup.component.html',
	styleUrls: ['./pickup.component.scss'],
})
export class PickupComponent {
	title = 'test';

	constructor(
		private __session: SessionService,
		private __student: StudentService
	) {}

	ngOnInit(): void {
		this.validateSession();
		this.validateStudents();
	}

	option: 'pickup' | 'register' = 'pickup';

	toggleOption(option: 'pickup' | 'register') {
		this.option = option;
	}

	public user: User = {
		name: '',
		id: '',
		phone: 0,
		email: '',
		password: '',
	};

	async validateSession() {
		const user = await this.__session.getSession();

		if (user) {
			this.user = user;
		}
	}

	async validateStudents() {
		const user = await this.__session.getSession();

		if (user) {
			const students = await this.__student.get(user.id);

			if (!students) {
				this.option = 'register';
			}
		}
	}
}
