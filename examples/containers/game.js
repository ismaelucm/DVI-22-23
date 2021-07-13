import playGame from "./PlayGame.js";
var config = {
    type: Phaser.AUTO,
    width:  800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    scene: [playGame],
    physics: { default: 'arcade', arcade: { gravity: { y: 400 }, debug: false } }
};

new Phaser.Game(config);


