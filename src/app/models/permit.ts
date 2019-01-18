import {Company} from './company';
import {Additional} from './additional';
import {Package} from './package';

export interface Permit{
    id: number;
    fair_id: number;
    company_id: number;
    allowed: boolean;
    company?: Company;
    additionals?: Array<Additional>;
    package?: Package;
}
