export default class Planet extends Phaser.GameObjects.Container {
    constructor(scene, x, y, scale, speed) {
        // Separamos el sprite con el aspecto del container
        // de la creación del container
        let aspecto = scene.add.sprite(0, 0, 'bubble');
        super(scene, x, y, aspecto);
        scene.add.existing(this);
        this.scaleX = scale;
        this.scaleY = scale;
        this._speed = speed;
    }
    
    preUpdate(t, dt) {
        // Para actualizar los hijos hay que llamar al preUpdate manualmente.
        this.iterate( (child) => child.preUpdate(t,dt) );
        // Por supuesto esto tiene la cosa de que para trasladar la Tierra hay que rotar el Sol 
        // pero esa es la gracia del ejemplo: ver cómo se mueve el hijo al mover el padre.
        this.angle += this._speed * dt/1000;
    }

}