export enum slots {
    mainHand = 'mainHand',
    offHand = 'offHand',
    helmet = 'helmet',
    chestpiece = 'chestpiece',
    leftarm = 'leftarm',
    rightarm = 'rightarm',
    leftfeet = 'leftfeet',
    rightfeet = 'rightfeet'
}

export namespace slots {
    export function keys(): Array<string>{
      var keys = Object.keys(slots);
      return keys.slice(0, keys.length -1);
    }
  }