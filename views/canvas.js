var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.width= window.innerWidth;
canvas.height=window.innerHeight;
var c = canvas.getContext('2d');
//c.fillStyle=''color
//c.fillRect(100,100,100, 100);

//line
/*c.beginPath();
c.moveTo(50,300);
c.lineTo(300, 100);
//c.strokeStyle='' ;
c.stroke();
*/
//Arc circlr

/*for (i=0;i< 100;i++){
    var x=Math.random()*window.innerWidth;
    var y=Math.random()*window.innerHeight;
    c.beginPath();
    c.arc(x,y, 20, 0, Math.PI * 2, false);
    c.strokeStyle='blue';
    c.stroke();
}*/
var mouse={
    x: undefined,
    y:undefined
}
var maxRadius = 30;
var minRadius = 10;
var colorArray = [
    '#879D9B',
    '#294551',
    '#143141',
    '#50767F',
    '#7C9997'
]
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
function Circle(x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx=dx;
    this.dy= dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.draw = function(){
            c.beginPath();
            c.arc(this.x,this.y,this.radius, 0, Math.PI * 2, false);
            c.strokeStyle='blue';
            c.fillStyle = this.color;
            c.fill();
    }
    this.update = function (){
        if (this.x+this.radius>innerWidth ||
            this.x-this.radius <0){
            this.dx=-this.dx;
        }
        if (this.y+this.radius>innerHeight || 
            this.y-this.radius <0){
            this.dy=-this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        //interactivity
        if (mouse.x - this.x <50 && mouse.x - this.x > -50 && mouse.y-this.y <50 && mouse.y - this.y >-50){
            if (this.radius < maxRadius){
            this.radius +=1;
            }
        }
        else if (this.radius >minRadius){
            this.radius -=1;
        }
        this.draw(); 
    }
}

var circleArray=[];


function init(){
    circleArray = [];
    for (var i=0;i<300;i++){
        
            var radius=30;
            var x=Math.random()*(innerWidth-radius*2)+radius;
            var y=Math.random()*(innerHeight-radius*2)+radius;
            var dx=Math.random()-0.5;
            var dy=Math.random()-0.5;
            
            circleArray.push(new Circle(x,y,dx,dy,radius));
        }
}




function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for (var j=0;j<circleArray.length;j++){
        circleArray[j].update();
    }
}
init();
animate();