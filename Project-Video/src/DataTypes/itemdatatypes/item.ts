import { rarity } from './rarity';
import { Propertys } from './property';

export interface IItem {
  name: string;
  id: number;
  rarity: string;
  propertys: Propertys;
}

export class Item {
  name: string;
  id: number;
  rarity: string;
  propertys: Propertys;

  constructor(obj: IItem) {
    Object.assign(this, obj);
  }
}
