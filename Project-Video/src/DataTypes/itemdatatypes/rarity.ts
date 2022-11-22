export enum rarity {
    commen = 'commen',
    uncommen = 'uncommen',
    rare = 'rare',
    legendary = 'legendary',
    mythic = 'mythic'
}

export namespace rarity {
    export function keys(): Array<string>{
      var keys = Object.keys(rarity);
      return keys.slice(0, keys.length -1);
    }
}