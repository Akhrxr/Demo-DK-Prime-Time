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
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.add.image(960,550,"lot")
            .setScale(1.22)
            .setDepth(91)
        this.add.text(this.w/2 - 260,this.h/2 - 50,"Park the car, not here tho. Keep driving")
            .setStyle({ fontSize: `${2.3 * this.s}px`, color: '#000' })
            .setDepth(95);
        this.add.text(this.w/2 -150,this.h/2 + 50,"Use the arrow keys to move")
            .setStyle({ fontSize: `${2.5 * this.s}px`, color: '#aef' })
            .setDepth(95);
        this.r32 = this.physics.add.sprite(100,500,"driver")
            .setScale(0.25)
            .setInteractive()
            .setCollideWorldBounds(true)
            .setDepth(99)
        this.black1 = this.physics.add.image(990,170,"blackcar")
            .setImmovable()
            .setScale(0.64)
            .setDepth(99)
        this.black2 = this.physics.add.image(1240,170,"blackcar")
            .setImmovable()
            .setScale(0.64)
            .setDepth(99)
        this.red = this.physics.add.image(990,920,"redcar")
            .setImmovable()
            .setScale(0.3)
            .setDepth(99)
        this.purp = this.physics.add.image(720,920,"purpcar")
            .setImmovable()
            .setScale(0.25)
            .setDepth(99)
        this.porsche = this.physics.add.image(1510,920,"porsche")
            .setImmovable()
            .setScale(0.4)
            .setDepth(99)
        this.porsche2 = this.physics.add.image(1510,170,"porsche")
            .setImmovable()
            .setScale(0.4)
            .setDepth(99)
        this.box1 = this.add.rectangle(720,190,240,350)
            .setDepth(99)
            .setFillStyle(0xff0000, 0.1)
        this.box2 = this.add.rectangle(1240,920,240,350)
            .setDepth(99)
            .setFillStyle(0xff0000, 0.1)
        this.finish = this.add.rectangle(1900,490,20,1350)
            .setDepth(99)
            .setFillStyle(0xff0000, 0.1)
        this.physics.add.existing(this.black2);
        this.physics.add.existing(this.black1);
        this.physics.add.existing(this.red);
        this.physics.add.existing(this.purp);
        this.physics.add.existing(this.porsche);
        this.physics.add.existing(this.porsche2);
        this.physics.add.existing(this.box1);
        this.physics.add.existing(this.box2);
        this.physics.add.existing(this.finish);
        this.messageBox = this.add.text(100, 200)
            .setStyle({ fontSize: `${2.2 * this.s}px`, color: '#ea0' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s)
            .setDepth(99);
    }
    update() {
        if(this.physics.overlap(this.r32, this.finish)) {
            this.gotoScene('scene4');
        }
        if(this.cursorKeys.right.isDown){
            this.r32.x += 2.5
        }
        else if(this.cursorKeys.left.isDown){
            this.r32.x += -2.5
        }
        if(this.cursorKeys.up.isDown){
            this.r32.y += -2.5
        }
        else if(this.cursorKeys.down.isDown) {
            this.r32.y += 2.5
        }
        if( this.physics.collide(this.r32, this.purp) |
            this.physics.collide(this.r32, this.red) | 
            this.physics.collide(this.r32, this.porsche2) | 
            this.physics.collide(this.r32, this.porsche) | 
            this.physics.collide(this.r32, this.box1) | 
            this.physics.collide(this.r32, this.box2) | 
            this.physics.collide(this.r32, this.black2) | 
            this.physics.collide(this.r32, this.black1)
        ) {
            this.r32.x = 100
            this.r32.y = 500
        }
        if(this.physics.collide(this.r32, this.box1) | this.physics.collide(this.r32, this.box2)) {
            this.messageBox.setText("You cant park here. (Bc I said so)");
            this.tweens.add({
                targets: this.messageBox,
                alpha: { from: 1, to: 0 },
                easing: 'Quintic.in',
                duration: 4 * this.transitionDuration
            });
        }
        if(this.physics.collide(this.r32, this.black1) | 
            this.physics.collide(this.r32, this.black2) |
            this.physics.collide(this.r32, this.porsche) |
            this.physics.collide(this.r32, this.porsche2) |
            this.physics.collide(this.r32, this.red) |
            this.physics.collide(this.r32, this.purp) ) {
            this.messageBox.setText("You crashed. Try again");
            this.tweens.add({
                targets: this.messageBox,
                alpha: { from: 1, to: 0 },
                easing: 'Quintic.in',
                duration: 4 * this.transitionDuration
            });
        }
    }
}
class Scene4 extends DKScene {
    constructor() {
        super('scene4');
    }
    preload(){
        this.load.image('rx7',"assets/rx7.png");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor('000');
        let back = this.add.image(950,700,"rx7");
        this.tweens.add({
            targets: back,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 1000,
            repeat: -1,
        })
       // console.log(back)
        this.add.text(950,150,"You parked the car. Now go get your sandwich!")
            .setOrigin(0.5)
            .setStyle({ fontSize: `${2.5 * this.s}px`, color: '#fff' })
            .setDepth(100);
            this.time.delayedCall(6000, () => this.gotoScene('scene5'));
    }
}
class Scene5 extends DKScene {
    constructor() {
        super('scene5');
    }
    preload(){
        this.load.image('store',"assets/store.jpg")
        this.load.image('sanwich',"assets/sanwich.png")
        this.load.image('drank',"assets/drank.png")
        this.load.image('cart',"assets/cart.png")
        this.load.image('cartsan',"assets/cartsanwich.png")
        this.load.image('cartbot',"assets/cartbottle.png")
    }
    onEnter(){
        this.input.on('pointerdown',this.startDrag, this);
        this.cont = 0;
        this.showMessage("Grab yo sanwish")
        this.add.image(960,550,"store")
            .setScale(3.4)
        this.sanwhich = this.add.sprite(1210, 440, "sanwich")
            .setScale(0.1)
            .setInteractive({useHandCursor:true})
            .setAlpha(1)
            .on('pointerover', () => {
                this.showMessage("Time to eats, put it in the basket")
            })
        this.botto = this.add.sprite(840, 600, "drank")
            .setScale(0.1)
            .setInteractive({useHandCursor:true})
            .setAlpha(1)
            .on('pointerover', () => {
                this.showMessage("Time to drank, put it in the basket")
            })
        this.cart = this.add.image(1410,860,"cart")
            .setScale(0.6)
        this.cartbot = this.add.image(1410,860,"cartbot")
            .setScale(0.6)
            .setAlpha(0)
        this.cartsan = this.add.image(1410,860,"cartsan")
            .setScale(0.6)
            .setAlpha(0)
        this.cartfin = this.add.image(1410,860,"cartfin")
            .setScale(0.6)
            .setAlpha(0)
        this.box = this.add.rectangle(1450,800,500,340)
            .setFillStyle(0xff0000, 0);
        this.physics.add.existing(this.box);
        this.physics.add.existing(this.botto);
        this.physics.add.existing(this.sanwhich);
    }
    update(){
        if(this.physics.overlap(this.sanwhich, this.box)) {
            this.sanwhich.destroy()
            this.cartsan.setAlpha(1);
            this.showMessage("Mm yum")
            this.cont++;
        }
        if(this.physics.overlap(this.botto,this.box)) {
            this.botto.destroy()
            this.cartbot.setAlpha(1);
            this.showMessage("bouta gulp this thang")
            this.cont++;
        }
        if(this.cont == 2) {
            this.showMessage("Nice, time to go home!")
            this.time.delayedCall(3000, () => this.gotoScene('outro'));
        }
    }     
}
class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    preload() {
        this.load.image('r32end', 'assets/r32end.png');
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
        this.cameras.main.setBackgroundColor('#444');
        this.background = this.add.image(100,0, "r32end");
        this.background.setOrigin(0,0);
        this.background.setScale(.75);

        this.add.text(50,50, "You did it! Now you won't starve! ").setFontSize(50);
        this.add.text(50,100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.startupsound.play(tuboConfig);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
            //this.startupsound.stop();
        });
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
    scene: [Intro, Scene1, Scene2, Scene3, Scene4, Scene5, Outro],
    title: "DK PRIME TIME",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
});