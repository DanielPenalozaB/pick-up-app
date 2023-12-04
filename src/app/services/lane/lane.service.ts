import { Injectable } from '@angular/core';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Lane, LaneTable } from 'src/app/types/lane';
import db from 'src/config/firestore';
import { StudentService } from '../student/student.service';

@Injectable({
	providedIn: 'root',
})
export class LaneService {
	constructor(
		private toastr: ToastrService,
		private __student: StudentService
	) {}

	async getLanes() {
		const q = query(collection(db, 'pickup'));
		const getRef = await getDocs(q);

		if (getRef.empty) {
			return [];
		} else {
			const lanes = getRef.docs.map((lane) => ({
				...lane.data(),
				id: lane.id,
			}));

			return lanes as Lane[];
		}
	}

	async getLane(id: number) {
		const q = doc(db, 'pickup', id.toString());
		const getRef = await getDoc(q);

		if (getRef.exists()) {
			return getRef.data() as Lane;
		} else {
			return 'Lane not found';
		}
	}

	async pickup(id: string, lane: number) {
		const q = doc(db, 'pickup', lane.toString());
		const getLane = await getDoc(q);

		if (getLane.exists()) {
			const laneData = getLane.data() as Lane;

			console.log(laneData);

			if (laneData.available === true) {
				const data = {
					available: false,
					parent: id,
				};

				await setDoc(doc(db, 'pickup', lane.toString()), data);

				this.toastr.success(undefined, 'Arrived succesfully', {
					newestOnTop: true,
					progressBar: true,
					progressAnimation: 'increasing',
					timeOut: 3000,
				});

				return 'Arrived succesfully';
			} else {
				this.toastr.error(undefined, 'The lane is not available', {
					newestOnTop: true,
					progressBar: true,
					progressAnimation: 'increasing',
					timeOut: 3000,
				});

				return 'The lane is not available';
			}
		}

		this.toastr.error(undefined, 'Lane not found', {
			newestOnTop: true,
			progressBar: true,
			progressAnimation: 'increasing',
			timeOut: 3000,
		});
		return 'LANE NOT FOUND';
	}

	async ready(id: string) {
		const q = doc(db, 'pickup', id);
		const getLane = await getDoc(q);

		console.log(id, getLane.data());

		if (getLane.exists()) {
			const data = {
				available: true,
				parent: '',
			};

			await setDoc(doc(db, 'pickup', id), data);

			this.toastr.success(undefined, 'Students picked succesfully', {
				newestOnTop: true,
				progressBar: true,
				progressAnimation: 'increasing',
				timeOut: 3000,
			});
		} else {
			this.toastr.error(undefined, 'User not found', {
				newestOnTop: true,
				progressBar: true,
				progressAnimation: 'increasing',
				timeOut: 3000,
			});
		}
	}

	async getStudents() {
		const q = query(collection(db, 'pickup'));
		const getLanes = await getDocs(q);

		if (getLanes.empty) {
			return [];
		} else {
			let lanesArray: Lane[] = [];

			getLanes.forEach(
				(lane) =>
					(lanesArray = [
						...lanesArray,
						{ ...(lane.data() as Lane), id: lane.id },
					])
			);

			let lanes: LaneTable[] = [];

			for (const lane of lanesArray) {
				const students = await this.__student.get(lane.parent);

				const data = {
					...lane,
					students,
				};

				lanes.push(data);
			}

			return lanes;
		}
	}
}
