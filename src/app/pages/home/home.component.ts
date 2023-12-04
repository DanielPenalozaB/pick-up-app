import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LaneService } from 'src/app/services/lane/lane.service';
import { LaneTable } from 'src/app/types/lane';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	constructor(private __lane: LaneService) {}

	lanes: LaneTable[] = []

	ngOnInit(): void {
		this.getLanes();
	}

	async getLanes() {
		const lanes = await this.__lane.getStudents();

		console.log(lanes);
		this.lanes = lanes;
	}
}
