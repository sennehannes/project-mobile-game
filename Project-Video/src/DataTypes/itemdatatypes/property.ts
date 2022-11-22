import { Ability} from './ability';

export interface Propertys {
    slot: string[];
    abilitys: Ability[];
    equipedSlot: string;
    attackModifyer: number;
    defenseModifyer: number;
  }
