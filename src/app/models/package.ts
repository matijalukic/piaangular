import {Fair} from './fair';

export interface Package {
    id:number;
    title: string;
    video_promotion: number;
    no_lessons: number;
    no_workchops: number;
    no_presentation: number;
    price: number;
    max_companies: number;
    fair?: Fair;
}
