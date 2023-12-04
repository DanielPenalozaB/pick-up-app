import { Injectable } from '@angular/core';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/types/student';
import db from 'src/config/firestore';

@Injectable({
	providedIn: 'root',
})
export class StudentService {
	constructor(private toastr: ToastrService) {}

	async get(id: string) {
		const q = query(collection(db, 'students'), where('parent', '==', id));
		const getRef = await getDocs(q);

		if (getRef.empty) {
			return [];
		} else {
			const students: Student[] = getRef.docs.map(
				(stu) => stu.data() as Student
			);

			return students;
		}
	}

	async create(student: Student) {
		const q = query(
			collection(db, 'students'),
			where('parent', '==', student.parent)
		);
		const getRef = await getDocs(q);

		if (getRef.empty) {
			try {
				const docRef = await addDoc(
					collection(db, 'students'),
					student
				);
				this.toastr.success(undefined, 'Student created successfully', {
					newestOnTop: true,
					progressBar: true,
					progressAnimation: 'increasing',
					timeOut: 3000,
				});
				console.log('Document written with ID: ', docRef.id);

				return;
			} catch (error) {
				console.log(error);
				this.toastr.error(undefined, 'Error creating user', {
					newestOnTop: true,
					progressBar: true,
					progressAnimation: 'increasing',
					timeOut: 3000,
				});

				return;
			}
		} else {
			const students: Student[] = getRef.docs.map(
				(stu) => stu.data() as Student
			);

			const studentExists = students.some(
				(stu) => stu.name === student.name
			);

			if (studentExists) {
				this.toastr.error(undefined, 'Student already exists', {
					newestOnTop: true,
					progressBar: true,
					progressAnimation: 'increasing',
					timeOut: 3000,
				});
			} else {
				if (student.name !== '') {
					try {
						const docRef = await addDoc(
							collection(db, 'students'),
							student
						);

						this.toastr.success(
							undefined,
							'Student created successfully',
							{
								newestOnTop: true,
								progressBar: true,
								progressAnimation: 'increasing',
								timeOut: 3000,
							}
						);
						console.log('Document written with ID: ', docRef.id);
					} catch (error) {
						console.log(error);
						this.toastr.error(undefined, 'Error creating user', {
							newestOnTop: true,
							progressBar: true,
							progressAnimation: 'increasing',
							timeOut: 3000,
						});
					}
				}
			}
		}
	}
}
