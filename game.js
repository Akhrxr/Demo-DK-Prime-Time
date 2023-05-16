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
    onEnter(){
        this.cameras.main.setBackgroundColor('000');
        let background = this.add.image(300,350,"nsx")
            .setScale(1)
            .setOrigin(0,0);
        this.tweens.add({
            targets: background,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 1000,
            repeat: -1,
        })
        this.add.text(950,150,"You started the car and leave the neighborhood")
            .setOrigin(0.5)
            .setStyle({ fontSize: `${2.5 * this.s}px`, color: '#fff' })
            .setDepth(100);
            this.time.delayedCall(6000, () => this.gotoScene('scene3'));
    }
}
class Scene3 extends DKScene {
    constructor() {
        super('scene3');
    }
    preload() {
        this.load.image('porsche',"assets/porschecar.png");
        this.load.image('lot',"assets/lot.png");
        this.load.image('redcar',"assets/redcar.png");
        this.load.image('blackcar',"assets/blackcar.png");
        this.load.image('purpcar',"assets/purpcar.png");
        this.load.image('driver',"assets/driver.png");
    }
    onEnter(){
        this.add.image(960,550,"lot")
            .setScale(1.22)
            .setDepth(91)
        this.add.text(this.w/2,this.h/2 - 50,"Park the car")
            .setStyle({ fontSize: `${3 * this.s}px`, color: '#000' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s)
            .setDepth(95);
        this.add.text(this.w/2 -150,this.h/2 + 50,"Use the arrow keys to move")
            .setStyle({ fontSize: `${2.5 * this.s}px`, color: '#aef' })
            .setDepth(95);
        let driver = this.physics.add.sprite(100,500,"driver")
            .setScale(0.25)
            .setInteractive()
            .setCollideWorldBounds(true)
            .setDepth(99)
            .setOrigin(0,0)
            //.setAngle(180)
            //.setRotation();
        
        let black1 = this.physics.add.image(990,170,"blackcar")
            .setImmovable()
            .setScale(0.25)
            .setDepth(99)
        let red = this.physics.add.image("redcar")
            .setImmovable()
            .setScale(0.9)
        let purp = this.physics.add.image("purpcar")
            .setImmovable()
            .setScale(0.9)
        let porsche = this.physics.add.image("porsche")
            .setImmovable()
            .setScale(0.9)
        this.physics.add.collider(driver, black1);
        this.physics.add.collider(driver, red);
        this.physics.add.collider(driver, purp);
        this.physics.add.collider(driver, porsche);
    }
    update() {

    }
}
class Scene4 extends Phaser.Scene {
    constructor() {
        super('scene4');
    }
    preload(){
        //You made it out of traffic, now swim!
    }
    create(){
        
    }
}
class Scene5 extends Phaser.Scene {
    constructor() {
        super('scene5');
    }
    preload(){
        //Swimming part of the game where you go through cars n stuffs
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
    scene: [Scene3, Intro, Scene1, Scene4, Scene5, Outro],
    title: "DK PRIME TIME",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
});