import { Injectable } from '@angular/core';
import { Ability } from 'src/DataTypes/itemdatatypes/ability';
import { Item } from 'src/DataTypes/itemdatatypes/item';
import { rarity } from 'src/DataTypes/itemdatatypes/rarity';
import { slots } from 'src/DataTypes/itemdatatypes/slots';
import { Player } from 'src/DataTypes/player';
import {cloneDeep} from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  #loggedInplayer: Player;
  #playerList: Player[] = [];
  #itemlist: Item[] = [];
  openAbilityDescription = false;
  #itemAbilityList: Ability[] = [];
  #selectedItem: Item;
  #selectedAbility: Ability;
  constructor() {
    this.#itemAbilityList.push({
      name: 'harden',
      id: 1,
      description: 'Take a flat amount of less damage from every attack.',
    });
    this.#itemAbilityList.push({
      name: 'regenerative',
      id: 2,
      description: 'Regen a flat amount of HP every turn.',
    });
    this.#itemlist.push({
      name: 'dagger',
      id: 1,
      rarity: rarity.commen,
      propertys: {
        slot: [slots.mainHand, slots.offHand],
        abilitys: [],
        equipedSlot: slots.offHand,
        attackModifyer: 4,
        defenseModifyer: -1,
      },
    });
    this.#itemlist.push({
      name: 'sword',
      id: 2,
      rarity: rarity.commen,
      propertys: {
        slot: [slots.mainHand],
        abilitys: [],
        equipedSlot: slots.mainHand,
        attackModifyer: 3,
        defenseModifyer: 1,
      },
    });
    this.#itemlist.push({
      name: 'shoulderPlate',
      id: 3,
      rarity: rarity.uncommen,
      propertys: {
        slot: [slots.rightarm, slots.leftarm],
        abilitys: [
          this.findAbilityByName('harden'),
          this.findAbilityByName('regenerative'),
        ],
        equipedSlot: slots.rightarm,
        attackModifyer: 0,
        defenseModifyer: 5,
      },
    });
    this.#playerList.push({
      name: 'senne',
      id: 1,
      items: cloneDeep(this.#itemlist),
      maxHealth: 20,
      currentHealth: 20,
      defense: 0,
      attack: 0,
    });
    this.#playerList.push({
      name: 'bram',
      id: 2,
      items: cloneDeep(this.#itemlist),
      maxHealth: 20,
      currentHealth: 20,
      defense:0,
      attack:0,
    });
  }

  /**
   *login the given player.
   *
   * @param playerName
   * input string (playername).
   */
  loginPlayer(playerName: string){
    this.#loggedInplayer = this.#playerList.find((t) => t.name === playerName);
  }

  /**
   * loggout the currently logged in player
   */
  loggoutPlayer(){
    this.#loggedInplayer = undefined;
  }

  /**
   * check if a player is logged in.
   *
   * @returns
   * true if player is logged in otherwhise return false
   */
  playerLoggedIn(){
    if(this.#loggedInplayer === undefined){
      return false;
    }else{
      return true;
    }
  }

  /**
   * find the ability datatype of the given ability name.
   *
   * @param abilityName
   * input string (abilityname).
   *
   * @returns
   * ability (Ability)
   */
  findAbilityByName(abilityName: string): Ability {
    return this.#itemAbilityList.find((t) => t.name === abilityName);
  }

  /**
   * return all items of the given rarity
   *
   * @param givenRarity
   * input string (rarity)
   *
   * @return
   * array of items (Item).
   */
  getAllItemsOfRarity(givenRarity: string) {
    const itemListUnequiped = this.getAllPlayerBackpacktems();
    return itemListUnequiped.filter((t) => t.rarity === givenRarity);
  }

  /**
   * get all items of the given slot that are currently unequiped
   *
   * @param slot
   * input string (slot)
   *
   * @return
   * array of items (Item).
   */
  getAllItemsOfSlot(slot: string): Item[] {
    const itemListUnequiped = this.getAllPlayerBackpacktems();
    return itemListUnequiped.filter((t) => t.propertys.slot.includes(slot));
  }

  /**
   * get all items currently in the logged in players backpack
   *
   * @returns
   * array of items (Item).
   */
  getAllPlayerBackpacktems(): Item[] {
    const itemListUnequiped = this.#loggedInplayer.items.filter(
      (t) => t.propertys.equipedSlot == null
    );
    return itemListUnequiped;
  }

  /**
   * get the currently logged in players name
   *
   * @returns
   * string containing the name
   *
   * if no player is logged in return string containing 'none'
   */
  getPlayerName(): string {
    if(this.#loggedInplayer !== undefined){
      return this.#loggedInplayer.name;
    }else{
      return 'none';
    }
  }

  getAllEquipedItems(): Item[]{
    const equipedItems = this.#loggedInplayer.items.filter((t) => t.propertys.equipedSlot !== null);
    return equipedItems;
  }

  getEquipedItemInSlot(slot: string): string {
    const itemListEquiped = this.#loggedInplayer.items.filter(
      (t) => t.propertys.equipedSlot != null
    );
    if (
      itemListEquiped.find((t) => t.propertys.equipedSlot === slot) ===
      undefined
    ) {
      return 'none';
    } else {
      return itemListEquiped.find((t) => t.propertys.equipedSlot === slot).name;
    }
  }

  getEquipedItemInSlotById(slot: string): number {
    const itemListEquiped = this.#loggedInplayer.items.filter(
      (t) => t.propertys.equipedSlot != null
    );
    if (
      itemListEquiped.find((t) => t.propertys.equipedSlot === slot) ===
      undefined
    ) {
      return null;
    } else {
      return itemListEquiped.find((t) => t.propertys.equipedSlot === slot).id;
    }
  }

  slotIsEquiped(slot: string): boolean {
    if (this.getEquipedItemInSlot(slot) === 'none') {
      return false;
    } else {
      return true;
    }
  }

  selectItem(itemId: number) {
    this.#selectedItem = this.#loggedInplayer.items.find((t) => t.id === itemId);
  }

  isSelected(value: Item | Ability): boolean;
  isSelected(x: any): boolean {
    if (this.#selectedItem !== undefined) {
      if (this.#selectedItem.id === x.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  unequipeItem(slot: string) {
    const equipedItem = this.#loggedInplayer.items.find(
      (t) => t.id === this.getEquipedItemInSlotById(slot)
    );
    const equipedItemIndex = this.#loggedInplayer.items.findIndex(
      (t) => t === equipedItem
    );
    equipedItem.propertys.equipedSlot = null;
    this.#loggedInplayer.items.splice(equipedItemIndex, 1, equipedItem);
  }

  equipItem(slot: string) {
    if (this.#selectedItem !== undefined) {
      if (
        this.getEquipedItemInSlot(slot) === 'none' &&
        this.#selectedItem.propertys.slot.includes(slot)
      ) {
        const equipedItemIndex = this.#loggedInplayer.items.findIndex(
          (t) => t === this.#selectedItem
        );
        this.#selectedItem.propertys.equipedSlot = slot;
        this.#loggedInplayer.items = this.#loggedInplayer.items.map((t) => { if(t.id === this.#selectedItem.id)
        {
          t = this.#selectedItem;
        }
        return t;
        });
        this.#selectedItem = undefined;
      }
    }
  }

  updateItems(playerItems: Item[]) {
    this.#loggedInplayer.items = playerItems;
  }

  showItemAbilitys(itemId) {
    const itemAbilitys = this.#itemlist.find((t) => t.id === itemId).propertys
      .abilitys;
    if (itemAbilitys.length === 0) {
      return ['none'];
    } else {
      const abilityNameList = [];
      itemAbilitys.forEach((ability) => {
        abilityNameList.push(ability);
      });
      return abilityNameList;
    }
  }

  showItemAbilityDescription(show: boolean, ability?: Ability) {
    this.openAbilityDescription = show;
    if (ability !== undefined) {
      this.#selectedAbility = this.#itemAbilityList.find(
        (t) => t.id === ability.id
      );
    }
  }

  showSelectedItemDescription() {
    return this.#selectedAbility.description;
  }

  showSelectedItemName() {
    return this.#selectedAbility.name;
  }
  getPlayerCurrentDefense() {
    let playerFullDefense: number = this.#loggedInplayer.defense;
    this.getAllEquipedItems().forEach((t) => playerFullDefense += t.propertys.defenseModifyer);
    return playerFullDefense;
  }

  getPlayerMaxHealth(){
    return this.#loggedInplayer.maxHealth;
  }

  getPlayerCurrentHealth(){
    return this.#loggedInplayer.currentHealth;
  }

  getPlayerHealthPercentage(){
    return this.#loggedInplayer.currentHealth / this.#loggedInplayer.maxHealth;
  }

  playerDamage(damage: number){
    this.#loggedInplayer.currentHealth -= damage;
  }

  getPlayerCurrentAttack() {
    let playerFullAttack: number = this.#loggedInplayer.attack;
    this.getAllEquipedItems().forEach((t) => playerFullAttack += t.propertys.attackModifyer);
    return playerFullAttack;
  }


  returnRarityColor(itemRarity: string) {
    if (itemRarity === rarity.commen) {
      return 'commen';
    } else if (itemRarity === rarity.uncommen) {
      return 'uncommen';
    } else {
      return 'danger';
    }
  }
}
