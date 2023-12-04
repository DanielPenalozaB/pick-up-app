import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	or,
	query,
	where,
} from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/types';
import db from 'src/config/firestore';

@Injectable({
	providedIn: 'root',
})
export class CreateService {
	constructor(private toastr: ToastrService, private router: Router) {}

	async create(user: User) {
		const q = query(
			collection(db, 'users'),
			or(
				where('id', '==', user.id),
				where('email', '==', user.email),
				where('phone', '==', user.phone)
			)
		);

		const getRef = await getDocs(q);

		if (!getRef.empty) {
			this.toastr.error(undefined, 'User already exists', {
				newestOnTop: true,
				progressBar: true,
				progressAnimation: 'increasing',
				timeOut: 3000,
			});
			return user;
		} else {
			try {
				const docRef = await addDoc(collection(db, 'users'), user);
				this.toastr.success(undefined, 'User created successfully', {
					newestOnTop: true,
					progressBar: true,
					progressAnimation: 'increasing',
					timeOut: 3000,
				});
				console.log('Document written with ID: ', docRef.id);
				this.router.navigate(['/login']);
				return user;
			} catch (error) {
				console.log(error);
				this.toastr.error(undefined, 'Error creating user', {
					newestOnTop: true,
					progressBar: true,
					progressAnimation: 'increasing',
					timeOut: 3000,
				});
				return user;
			}
		}
	}
}
