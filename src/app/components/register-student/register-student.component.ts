import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { StudentService } from 'src/app/services/student/student.service';
import { Student } from 'src/app/types/student';

@Component({
	selector: 'app-register-student',
	templateUrl: './register-student.component.html',
	styleUrls: ['./register-student.component.scss'],
})
export class RegisterStudentComponent {
	constructor(
		private __session: SessionService,
		private __student: StudentService
	) {}

	ngOnInit(): void {}

	@Input() selectedOption: string | undefined;

	@Output() handleClick = new EventEmitter<{
		name: string;
		section: string;
	}>();

	name = '';
	section = '';

	async saveStudent() {
		const user = await this.__session.getSession();

		if (user && user.uuid) {
			const STUDENT: Student = {
				name: this.name,
				section: this.section,
				parent: user.uuid,
			};

			const RESPONSE = this.__student.create(STUDENT);

			this.name = '';
			this.section = '';
		}
	}
}
