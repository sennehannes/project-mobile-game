import { Component } from '@angular/core';
import { slots } from 'src/DataTypes/itemdatatypes/slots';
import { PlayerService } from '../services/player.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(public playerService: PlayerService, public navController: NavController, public router: Router) {}

}
