export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }

    preload () {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.loadFont("Donuts", "/fonts/HAPPY_DONUTS.ttf");
    }
    
    create ()
    {
        let self = this;
        WebFont.load({
            google: {
                families: [ 'Qahiri', 'Finger Paint', 'Nosifer' ]
            },
            active: () =>// se llama a esta función cuando está cargada
            {
                let nuevoTexto = 
                    this.add.text(16, 0, 
                        'Texto con webfont', 
                        { fontFamily: 'Nosifer', fontSize: 40, color: '#ffffff' })
                nuevoTexto.setShadow(2, 2, "#333333", 2, false, true);
            }
        });


        let otroTexto = 
                    this.add.text(16, 300, 
                        'Texto con fuente del servidor', 
                        { fontFamily: 'Donuts', fontSize: 25, color: '#ffffff' })
    }
}
