import { Injectable } from '@angular/core';
import { doc, getDoc } from 'firebase/firestore';
import db from 'src/config/firestore';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor() {}

	public async get(id: string) {
		const docRef = doc(db, 'users', id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			return 'USER NOT FOUND';
		}
	}
}
