import { Student } from "./student";

export interface Lane {
    id: string,
    parent: string,
    available: boolean
}

export interface LaneTable {
	students: Student[];
	parent: string;
	available: boolean;
	id: string;
}