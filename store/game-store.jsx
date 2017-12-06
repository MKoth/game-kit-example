import { observable } from 'mobx';

class GameStore {
  @observable characterPosition = [{ x: 100, y: 100 },{ x: 200, y: 200 }];
  @observable characterState = [11,10];
  @observable timeStamp = [Date.now(),Date.now()];
  
  setcharacterPosition(position, index) {
    this.characterPosition[index] = position;
  }
}

export default new GameStore();