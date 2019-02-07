import {Fair} from './fair';


export interface Location{
    id: number;
    fair_id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    fair: Fair;
}
