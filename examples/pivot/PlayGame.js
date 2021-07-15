import Box from './box.js'
export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload () {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('box', 'assets/sprites/block.png');
    }
    
    create ()
    {
        let s1 = this.add.existing(new Box(this,200, 300));
        // s1: En la esquina superior izquierda
        s1.setOrigin(0,0)

        // s2: en el centro (por defecto)
        let s2 = this.add.existing(new Box(this,400, 300)); 
        
        let s3 = this.add.existing(new Box(this,600, 300)); 
        // s3: En el centro del borde superior
        s3.setOrigin(0.5,0)
    }


}
