import {Job} from './job';
import {Permit} from './permit';

export interface Company {
    id: number;
    name: string;
    address: string;
    city: string;
    director: string;
    pib: string;
    employees: number;
    domain: string;
    agency: string;
    speciality: string;
    jobs?: Array<Job>;
    permits?: Permit;
}
