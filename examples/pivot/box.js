export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'box');
        scene.add.existing(this);
        this.guizmo = scene.add.graphics();
        this.guizmo.fillStyle(0xFF0000, 1.0);
        this.guizmo.fillCircle(this.x, this.y,5);
    }
    
    preUpdate(t, dt) {
        this.angle += 90 * dt/1000;
    }

}