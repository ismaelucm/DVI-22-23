import Planet from "./planet.js" ;
export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload () {
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('bubble', 'assets/sprites/pangball.png');
    }
    
    create ()
    {
        // Estas escalas son interesantes porque se ve cómo unas afectan a las otras.
        // El Sol no se ve afectado, la Tierra se reduce a la mitad pero la Luna tiene una escala en teoría
        // más grande. No es cierto puesto que está en el sistema de coordenadas de la Tierra que yá está a
        // la mitad.
        let sun = new Planet(this, 400,300, 2, 90);
        let earth = new Planet(this, 80, 80, 0.5, 180);
        let moon = new Planet(this, 40, 40, 0.7, 270);
        sun.add(earth);
        earth.add(moon);
    }
}
