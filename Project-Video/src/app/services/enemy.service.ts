import { Injectable } from '@angular/core';
import {Enemy} from 'src/DataTypes/enemydatatypes/enemy';

@Injectable({
    providedIn: 'root',
  })

  export class EnemyService {
    #enemyList: Enemy[] = [];
    constructor() {
        this.#enemyList.push(new Enemy({
            name: 'goblin',
            id: 1,
            maxHealth: 10,
            currentHealth: 10,
            defense: 2,
            attack: 2}));
    }

    getEnemyByName(enemyName: string): Enemy{
        return this.#enemyList.find((t) => t.name === enemyName);
    }
  };
