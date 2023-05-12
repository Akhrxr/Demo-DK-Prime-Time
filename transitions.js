class DKScene extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.box = this.add.rectangle(0,0,600,400).setOrigin(0, 0).setFillStyle(0);
        this.box.depth = 90
        this.messageBox = this.add.text(0,0)
            .setStyle({ fontSize: `${2.2 * this.s}px`, color: '#a0e' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);
        this.messageBox.depth = 91
        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setDepth(100)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();

    }

    startDrag(pointer,targets) {
        this.input.off('pointerdown',this.startDrag, this);
        this.dragObj=targets[0];
        this.input.on('pointermove',this.doDrag, this);
        this.input.on('pointerup',this.stopDrag, this);

    }

    doDrag(pointer) {
        this.dragObj.x = pointer.x;
        this.dragObj.y = pointer.y;
    }

    stopDrag(pointer){
        this.input.on('pointerdown',this.startDrag, this);
        this.input.off('pointermove',this.doDrag, this);
        this.input.off('pointerup',this.stopDrag, this);

    }

    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 4 * this.transitionDuration
        });
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
    
}