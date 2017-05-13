var game = new Phaser.Game(480, 320, Phaser.AUTO, '', {
  preload: function(){
    this.scale.pageAlignHorizontally = true;
    this.game.load.image('hueso', huesoURI);
    this.game.load.image('flecha', flechaURI);
  },
  create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.hueso = this.game.add.sprite(this.game.world.centerX, this.game.world.height, 'hueso');
    this.hueso.anchor.setTo(0.5, 1);
    this.game.physics.arcade.enable(this.hueso);
    this.hueso.tint= 0xff00ff;
    
    this.huesoCopy = this.game.add.sprite(this.game.world.centerX, 0, this.hueso.key, this.hueso.frame);
    this.huesoCopy.anchor.x = 0.5;
    this.game.physics.arcade.enable(this.huesoCopy);
    this.huesoCopy.inputEnabled = true;
    this.huesoCopy.input.enableDrag();
    this.huesoCopy.originalPosition = this.huesoCopy.position.clone();
    this.huesoCopy.events.onDragStop.add(function(currentSprite){
      this.stopDrag(currentSprite, this.hueso);
    }, this);
    
    this.flecha = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'flecha');
    this.flecha.anchor.set(0.5);
  },
  stopDrag: function(currentSprite, endSprite){
    if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {
    currentSprite.input.draggable = false;
    currentSprite.position.copyFrom(endSprite.position); 
    currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
  })) { currentSprite.position.copyFrom(currentSprite.originalPosition);
  }
  }
});
