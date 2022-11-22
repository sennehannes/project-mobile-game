import { Component } from '@angular/core';
import { Enemy } from 'src/DataTypes/enemydatatypes/enemy';
import { EnemyService } from '../services/enemy.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  activeEnemy: Enemy;
  constructor(public playerService: PlayerService,public enemyService: EnemyService) {
    this.activeEnemy = this.enemyService.getEnemyByName('goblin');
  }
  attack(){
    this.activeEnemy.damage(this.playerService.getPlayerCurrentAttack());
    this.playerService.playerDamage(this.activeEnemy.attack);
  }

}
