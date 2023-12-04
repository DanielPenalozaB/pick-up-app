import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { and, collection, getDocs, query, where } from 'firebase/firestore';
import db from 'src/config/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	constructor(private toastr: ToastrService, private router: Router) {}

	async login(id: string, password: string) {
		const q = query(
			collection(db, 'users'),
			and(where('id', '==', id), where('password', '==', password))
		);

		const getRef = await getDocs(q);

		if (getRef.empty) {
			this.toastr.error(undefined, 'Wrong credentials', {
				newestOnTop: true,
				progressBar: true,
				progressAnimation: 'increasing',
				timeOut: 3000,
			});
		} else {
			const user = await getRef.docs[0];

			this.toastr.success(undefined, 'Correct credentials', {
				newestOnTop: true,
				progressBar: true,
				progressAnimation: 'increasing',
				timeOut: 3000,
			});

			console.log(user);
			localStorage.setItem('user', user.id);
			this.router.navigate(['pickup']);
		}
	}
}
