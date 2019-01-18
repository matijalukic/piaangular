import {PermitAdditional} from './permitadditional';
import {Fair} from './fair';

export interface Additional{
    id: number;
    title: string;
    price: number;
    fair?: Fair;
    permitAdditionals? : Array<PermitAdditional>;
}
