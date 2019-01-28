import {Company} from './company';
import {Application} from './application';

export interface Job {
    id?: number;
    company_id?: number;
    name: string;
    text: string;
    start?: string;
    end?: string;
    type: string;
    company?: Company;
    applications?: Array<Application>;

}
