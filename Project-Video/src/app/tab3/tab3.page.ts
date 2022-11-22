import { Component } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { slots } from 'src/DataTypes/itemdatatypes/slots';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  loginName: string;
  constructor(public playerService: PlayerService) {
  }

}
