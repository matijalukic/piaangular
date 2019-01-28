import {Company} from './company';
import {Additional} from './additional';
import {Package} from './package';
import {Permit} from './permit';

export interface Fair {
  id?: number;
  name: string;
  start: string;
  end: string;
  place: string;
  about: string;
  startCV?: Date;
  endCV?: Date;
  startParticipate?: Date;
  endParticipate?: Date;
  images?: string;
  companies? : Array<Company>;
  additionals? : Array<Additional>;
  packages?: Array<Package>;
  permits?: Array<Permit>;
}
