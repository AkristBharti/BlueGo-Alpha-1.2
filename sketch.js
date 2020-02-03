var player, diswidth, disheight;
var prevy, playerallow;
var ground, groundgroup, monstergroup, bulletgroup;
var score, health, sideindex;

function setup() {
  createCanvas(displayWidth-200,displayHeight-200);
  diswidth = displayWidth-200;
  disheight = displayHeight-200;
  player = createSprite(diswidth/2, disheight/2, 50, 50);
  ground = createSprite(diswidth/2, disheight-250, diswidth, 20);
  ground.shapeColor = "blue";
  groundgroup = createGroup();
  bulletgroup = createGroup();
  monstergroup = createGroup();
  skullgroup = createGroup();
  ground.debug = true;
  score = 0;
  //player.debug = true;
  prevy = disheight/2;
  playerallow = 0;
  sideindex = 0;
  player.addAnimation('idleright', playeridle);
  player.addAnimation('idleleft', playerleftidle);
  player.addAnimation('runright', playerrunright);
  player.addAnimation('runleft', playerrunleft);
  player.addAnimation('jump', playerjump);
  player.addAnimation('attackright', playerattackright);
  player.addAnimation('attackleft', playerattackleft);
  player.addAnimation('hurtright', playerhurtright);
  wolfrunright.frameDelay = 1+1/2;
  playerjump.frameDelay = 5;
  //groundgroup.add(ground);
}
function preload(){
  skullright = loadAnimation('Assets/skull1.png', 'Assets/skull2.png', 'Assets/skull3.png', 'Assets/skull4.png','Assets/skull5.png', 'Assets/skull6.png', 'Assets/skull7.png', 'Assets/skull8.png')
  wolfrunright = loadAnimation('Assets/wolfrun1.png', 'Assets/wolfrun2.png', 'Assets/wolfrun3.png','Assets/wolfrun4.png', 'Assets/wolfrun5.png', 'Assets/wolfrun1.png', 'Assets/wolfrun2.png', 'Assets/wolfrun3.png','Assets/wolfrun4.png', 'Assets/wolfrun5.png');
  playerrunright = loadAnimation('Assets/walk1.png', 'Assets/walk2.png', 'Assets/walk3.png', 'Assets/walk4.png', 'Assets/walk5.png', 'Assets/walk6.png');  
  playerattackright = loadAnimation('Assets/attack1.png', 'Assets/attack2.png', 'Assets/attack3.png', 'Assets/attack4.png', 'Assets/attack5.png', 'Assets/attack6.png');
  playerattackleft = loadAnimation('Assets/attackl1.png', 'Assets/attackl2.png', 'Assets/attackl3.png', 'Assets/attackl4.png', 'Assets/attackl5.png', 'Assets/attackl6.png');  
  playerrunleft = loadAnimation('Assets/walkl1.png', 'Assets/walkl2.png', 'Assets/walkl3.png', 'Assets/walkl4.png', 'Assets/walkl5.png', 'Assets/walkl6.png');
  firerightanim = loadAnimation('Assets/fire1.png', 'Assets/fire2.png', 'Assets/fire3.png', 'Assets/fire4.png', 'Assets/fire5.png', 'Assets/fire6.png', 'Assets/fire7.png', 'Assets/fire8.png');
  fireleftanim = loadAnimation('Assets/firel1.png', 'Assets/firel2.png', 'Assets/firel3.png', 'Assets/firel4.png', 'Assets/firel5.png', 'Assets/firel6.png', 'Assets/firel7.png', 'Assets/firel8.png');
  playeridle = loadAnimation('Assets/idle1.png', 'Assets/idle2.png', 'Assets/idle3.png', 'Assets/idle4.png', 'Assets/idle5.png', 'Assets/idle6.png', 'Assets/idle7.png')
  playerleftidle = loadAnimation('Assets/idlel1.png', 'Assets/idlel2.png', 'Assets/idlel3.png', 'Assets/idlel4.png', 'Assets/idlel5.png', 'Assets/idlel6.png', 'Assets/idlel7.png')
  playerhurtright = loadAnimation('Assets/hurt1.png', 'Assets/hurt1.png', 'Assets/hurt1.png', 'Assets/hurt1.png');
  playerjump = loadAnimation('Assets/jump1.png', 'Assets/jump2.png', 'Assets/jump3.png', 'Assets/jump4.png', 'Assets/jump5.png', 'Assets/jump6.png', 'Assets/jump7.png', 'Assets/jump8.png')
  //groundgroup.add(ground)
}
function draw() {
  //Controls
  player.collide(ground);
  //projectile();
  monstergroup.collide(ground);
  monsters(score);
  skulls(score);
  player.scale = 3;
  background(0,110,200); 
  textSize(40);
  fill(255, 0, 0);
  text("Score : "+score, diswidth/10, disheight/10);
  
  if(player.y > ground.y - 61){
    playerallow = 0;
    if(sideindex ===0){
      player.changeAnimation('idleright');
    }
    if(sideindex ===1){
      player.changeAnimation('idleleft');
    }
  }
   player.velocityX = 0;
  if(keyDown("space")&& playerallow === 0){
    player.velocityY = -20;
    player.changeAnimation('jump');
    playerallow = 1;
  }
  if(keyDown('left')){
    player.x = player.x - 13;
    player.changeAnimation('runleft')
    sideindex = 1;
  }
  if(keyDown('right')){
    player.x = player.x +13;
    player.changeAnimation('runright')
    sideindex = 0;
    
  }
  if(player.isTouching(monstergroup)||player.collide(skullgroup)){
    player.changeAnimation('hurtright');
  }
  //All Controls Extra
  if(bulletgroup.isTouching(monstergroup)){
    monstergroup.destroyEach();
    score+=10;
  }
  if(bulletgroup.isTouching(skullgroup)){
    skullgroup.destroyEach();
    score+=20;
  }
  if(sideindex ===0){
    weapon('right');
  }
  if(sideindex ===1){
    weapon('left');
  }
  player.velocityY = player.velocityY + 1;
  drawSprites();
}
function projectile(){
  if(frameCount % 100 === 0){
    var projectile = createSprite(diswidth + 50, ground.y - 60, 10, 10);
    projectile.velocityX = -20;
  }
}
function monsters(score){
  if(score < 1000){
    if(frameCount % 90 === 0){
      var monster = createSprite(diswidth + 50, ground.y -80, 30, 30);
      monster.addAnimation('runright', wolfrunright);
      monster.velocityY = monster.velocityY +10;
      monster.velocityX = -10;
      monster.scale = 2.4
      monstergroup.add(monster);
    }
  }
}
function skulls(score){
  if(score < 1000){
    if(frameCount % 100 === 0){
      var skull = createSprite(diswidth+50, ground.y -200, 30, 30);
      skull.addAnimation('skullright', skullright);
      skull.velocityX = -10;
      skull.scale = 1.3;
      skullgroup.add(skull);
    }
  }
}
function weapon(playerside){
  if (keyDown("j")){
    if(playerside === 'right'){
      player.changeAnimation('attackright');
    }
    if(playerside === 'left'){
      player.changeAnimation('attackleft');
    }
    if(frameCount%10===0){
      
      if(playerside === 'right'){
        var bullet = createSprite(player.x+10, player.y, 10, 10);
        var touchindex = 0;
        bullet.velocityX = 28;
        bullet.addAnimation('fireright',firerightanim);
        bullet.scale = 2.5;
        bulletgroup.add(bullet)
      }
      if(playerside === 'left'){
        var bullet = createSprite(player.x-10, player.y, 10, 10);
        bullet.velocityX = -28;
        bullet.addAnimation('fireleft',fireleftanim);
        bullet.scale = 2.5;
        bulletgroup.add(bullet);
      }
    }
  }
  
}