export interface IAbility {
  name: string;
  id: number;
  description: string;
}

export class Ability {
  name: string;
  id: number;
  description: string;

  constructor(obj: IAbility) {
    Object.assign(this, obj);
  }
}
