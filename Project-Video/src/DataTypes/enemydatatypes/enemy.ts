export interface IEnemy {
    name: string;
    id: number;
    maxHealth: number;
    currentHealth: number;
    defense: number;
    attack: number;
}

export class Enemy {
    name: string;
    id: number;
    maxHealth: number;
    currentHealth: number;
    defense: number;
    attack: number;
    constructor(obj: IEnemy) {
      Object.assign(this, obj);
    }
    damage?(damage: number){
        this.currentHealth -= damage;
    }
    getEnemyHealthPercentage?(): number{
        return this.currentHealth/this.maxHealth;
    }
}
