var fellows = [
  {name: 'nicky', pic: 'http://i.imgur.com/NH0fS3a.jpg'},
  {name: 'sandhya', pic: 'http://i.imgur.com/MneVgIY.jpg'},
  {name: 'pietro', pic: 'http://i.imgur.com/67mpliM.jpg'},
  {name: 'lisa', pic: 'http://i.imgur.com/UTQwCWk.jpg'},
  {name: 'martin', pic: 'http://i.imgur.com/IjE14gc.jpg'},
  {name: 'dan', pic: 'http://i.imgur.com/flRFF4k.jpg'},
  {name:'christine', pic: 'http://i.imgur.com/ISvEI6o.jpg'}
];

var originY = 1;
var originZ = -10;
var velocityY = 5;
var gravity = -3;
var step = .1;
var max = 5;

VR.floor().setMaterial('grass');

VR.sky();

fellows.forEach(function(fellow, index){
  fellow.body = 
    VR.sphere()
    .moveTo(3 * (index - (fellows.length / 2)), originY, originZ)
    .rotateY(-1.5)
    .setMaterial(fellow.pic);

  fellow.body.jumping = false;

  var direction = Math.floor(Math.random() * 3);
  fellow.body.direction = direction;
});

setInterval(function(){
   var fellow;
  fellow = getRandomFellow();
  startJump(fellow.body);
 
}, 1000)

VR.animate(function(delta){
  jumpStep(delta);
});

function startJump(body) {
  body.jumping = true;
  body.goingUp = true;
  body.velocityY = velocityY;
}

function jumpStep(delta) {
  fellows.forEach(function(fellow) {
    var body = fellow.body;
    if(!body.jumping) return;
 
    if (body.position.y >= 20) {
      body.goingUp = false;
    } else if (body.position.y <= 1) {
      body.moveTo(body.position.x, originY, body.position.z);
      body.jumping = false;
    }

    var way = body.goingUp ? 1 : -1;
    var distance = delta * way;
    body.moveY(body.velocityY * delta);
    body.velocityY += gravity * delta;
  });
}

VR.text({text: 'FellowNerds!'}).moveTo(0, 5, -5);

VR.animate(function(){
  fellows.forEach(moveIt);
});

function moveIt(fellow) {
  var direction = fellow.body.direction;
  var player = fellow.body;
  switch(direction) {
    case 0:
      player.position.x -= step;
      if(player.position.x <= -max) player.direction++;
      break;
    case 1:
      player.position.z -= step;
      if(player.position.z <= -max) player.direction++;
      break;
    case 2:
      player.position.x += step;
      if(player.position.x >= max) player.direction++;
      break;
    case 3:
      player.position.z += step;
      if(player.position.z >= max) player.direction = 0;
      break;

  }
}

function getRandomFellow() {
  return fellows[(Math.floor(9999 * Math.random())) % fellows.length];
}
