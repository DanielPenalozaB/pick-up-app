import { Component, Input } from '@angular/core';
import { SessionService } from 'src/app/services/auth/session.service';
import { LaneService } from 'src/app/services/lane/lane.service';
import { StudentService } from 'src/app/services/student/student.service';
import { User } from 'src/app/types';
import { Student } from 'src/app/types/student';

@Component({
	selector: 'app-pickup-student',
	templateUrl: './pickup-student.component.html',
	styleUrls: ['./pickup-student.component.scss'],
})
export class PickupStudentComponent {
	constructor(
		private __session: SessionService,
		private __lane: LaneService,
		private __student: StudentService
	) {}

	ngOnInit(): void {
		this.validateSession();
	}

	@Input() selectedOption: string | undefined;

	stage: 'arriving' | 'arrived' = 'arriving';

	lanes = [
		{
			id: '1',
			parent: '',
			available: true,
		},
		{
			id: '2',
			parent: '',
			available: true,
		},
		{
			id: '3',
			parent: '',
			available: true,
		},
	];

	selectedLane: string | undefined = undefined;

	public students: Student[] = [];

	public user: User | null = null;

	async validateSession() {
		const session = await this.__session.getSession();

		if (session) {
			this.user = session;
			this.getLanes();
		}
	}

	selectLane(lane: string) {
		this.selectedLane = lane;
	}

	async getLanes() {
		const lanes = await this.__lane.getLanes();

		if (lanes.length > 0) {
			const currentUser = this.user;

			const isPickingUp = lanes.find(
				(lane) => lane.parent === currentUser?.uuid
			);

			if (isPickingUp) {
				const students = await this.__student.get(isPickingUp.parent);

				if (students) {
					this.students = students;
				}

				this.stage = 'arrived';
				this.selectedLane = isPickingUp.id;
			}

			this.lanes = lanes;
		}
	}

	async arrived() {
		if (this.user && this.user.uuid && this.selectedLane) {
			const lane = Number(
				this.selectedLane.substring(this.selectedLane.indexOf('#') + 1)
			);

			const pickup = {
				parent: this.user.uuid,
				lane: lane,
			};

			console.log(pickup);
			const RESPONSE = await this.__lane.pickup(
				pickup.parent,
				pickup.lane
			);

			if (RESPONSE === 'Arrived succesfully') {
				this.stage = 'arrived';

				const students = await this.__student.get(this.user.uuid);

				if (students) {
					this.students = students;
				}
			}
		}
	}

	async ready() {
		console.log(this.selectedLane);

		if (this.selectedLane) {
			await this.__lane.ready(this.selectedLane);
			this.selectedLane = undefined;
			this.stage = 'arriving';
			this.getLanes();
		}
	}
}
