import { Item } from './itemdatatypes/item';

export interface IPlayer {
    name: string;
    id: number;
    items: Item[];
    maxHealth: number;
    currentHealth: number;
    defense: number;
    attack: number;
  }

  export class Player {
    name: string;
    id: number;
    items: Item[];
    maxHealth: number;
    currentHealth: number;
    defense: number;
    attack: number;
    constructor(obj: IPlayer) {
      Object.assign(this, obj);
    }
  }
