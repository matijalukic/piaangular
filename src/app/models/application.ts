import {Job} from './job';
import {Student} from './student';
import {User} from './user';

export interface Application{
    id: number;
    student_id: number;
    job_id: number;
    type: string;
    cover_letter?: string;
    pdf?: string;
    accepted?: Date;
    rate?: number;
    job?: Job;
    student?: Student;
    user?: User;
    createdAt?:Date;
    updatedAt?:Date;
}
