import Martian from "./martian.js" ;
import Pool from "./pool.js" ;
export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload () {
        this.load.setBaseURL('https://labs.phaser.io/assets/');
        this.load.image('phaser', 'sprites/ufo.png');
    }
    
    create ()
    {
        let martians = [];
        for (let i = 0; i < 100; i++) {
          martians.push(new Martian(this,0,0));
        }
        this.pool = new Pool(this, martians);       
    }
    
    update(time, delta) {    
        let x = Math.random() * this.game.config.width;
        let y = Math.random() * this.game.config.height;
        this.pool.spawn(x, y);
    }

    shouldDead(entity) {
        if (entity.y > this.game.config.height) {
            this.pool.release(entity);
        }
    }

}
