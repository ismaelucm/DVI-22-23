export default class Martian extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'phaser');
        scene.add.existing(this);
    }
    
    preUpdate(t, dt) {
        this.y += 2;
        this.scene.shouldDead(this);
    }
}