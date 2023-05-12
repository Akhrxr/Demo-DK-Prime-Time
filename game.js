class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload() {
        this.load.image('r32intro', 'assets/r32.png');
        this.load.audio('tubo', 'assets/turbo.mp3');
    }
    create(){
        this.startupsound = this.sound.add("tubo");

        var tuboConfig = {
            volume: 0.5,
            loop: false,
            rate: 1.5,
            mute: false,
        }

        this.background = this.add.image(0,0, "r32intro");
        this.background.setOrigin(0,0);
        this.background.setScale(.95);

        this.add.text(50,50, "It's finally time DK").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.startupsound.play(tuboConfig);
            this.time.delayedCall(1000, () => this.scene.start('scene1'));
            //this.startupsound.stop();
        });

    }
}
class Scene1 extends DKScene {
    constructor() {
        super('scene1');
    }
    preload() {
        this.load.image('r32cabin',"assets/r32cabin.jpg");
        this.load.image('r32key',"assets/r32key.png");
        this.load.audio('startup', 'assets/startupgtr.mp3');
        this.load.audio('star','assets/starclear.mp3');
    }
    onEnter() {
        let background = this.add.image(0, this.w * 0,"r32cabin")
            .setScale(2.25)
            .setOrigin(0,0);
        this.input.on('pointerdown',this.startDrag, this);
        this.box = this.add.rectangle(1440,580,75,75)
            .setFillStyle(0xff0000, 0.1);

        this.key = this.add.sprite(300, 300, "r32key")
            .setScale(0.05)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => {
                this.showMessage("Perfect for starting a car. \nYou should put it in the ignition")

            })
            .on('pointerdown', () => {
                this.showMessage("Put it in the ignition");  
            })
        this.key.depth = 92
        this.startupsound = this.sound.add("startup");

        this.starsound = this.sound.add("star");
        this.physics.add.existing(this.box);
        this.physics.add.existing(this.key);
        this.clutch = this.input.keyboard.addKey('C');
    }
    update() {
        if(this.physics.overlap(this.box, this.key) & this.clutch.isDown) {
            this.startupsound.play(startupConfig);
            this.scene.start('scene2')
        }
        else if (this.physics.overlap(this.box, this.key) & !this.clutch.isDown) {
            this.starsound.play(startConfig);
            this.showMessage("Hold C to activate the clutch");
        }
    }
}

class Scene2 extends DKScene {
    constructor() {
        super('scene2');
    }
    preload() {
        this.load.image('nsx',"assets/nsx.png");
    }
    create(){
        
    }
}
class Scene3 extends Phaser.Scene {
    constructor() {
        super('scene3');
    }
    preload() {

    }
    create(){
        
    }
}
class Scene4 extends Phaser.Scene {
    constructor() {
        super('scene4');
    }
    preload(){

    }
    create(){
        
    }
}
class Scene5 extends Phaser.Scene {
    constructor() {
        super('scene5');
    }
    preload(){

    }
    create(){
        
    }
}
class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    preload(){

    }
    create(){
        
    }
}

var startConfig = {
    volume: 0.8,
    loop: false,
    rate: 1.2,
    mute: false,
}

var startupConfig = {
    volume: 0.1,
    loop: false,
    rate: 1.2,
    mute: false,
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Scene1, Intro, Scene2, Scene3, Scene4, Scene5, Outro],
    title: "Adventure Game",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
});