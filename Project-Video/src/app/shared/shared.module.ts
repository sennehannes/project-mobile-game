import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItemComponent } from './inventory-item/inventory-item.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [InventoryItemComponent],
  exports: [InventoryItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class SharedModule { }
