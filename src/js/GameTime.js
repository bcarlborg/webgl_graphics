export default class GameTime {
  constructor() {
    if (GameTime.instance) return GameTime.instance;
    GameTime.instance = this;
    this.initTime = new Date().getTime();
    this.timeAtLastUpdate = this.initTime;
    this.timeRate = 1.0;

    this.timeInfo = {
      t: 0, dt: 0,
    };
  }

  setRate(rate) {
    this.timeRate = rate;
  }

  update() {
    const currentTime = new Date().getTime();
    const diff = currentTime - this.timeAtLastUpdate;
    const rateAdjustedDiff = diff * this.timeRate;

    this.timeInfo.t += rateAdjustedDiff;
    this.timeInfo.dt = diff;

    this.timeAtLastUpdate = currentTime;
  }
}
