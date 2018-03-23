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
function Particle(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.draw = () => {
            c.beginPath();
            c.arc(this.x,this.y,this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
    }
    this.update = ()=> {
        this.draw(); 
    }
}

let particles;




function init(){
    partcles = [];
    for (let i=0;i<400;i++){
            paricles.push(new Particle(canvas.width/2, canvas.height/2, 5, 'blue'));
        }
}




function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    particles.forEach(particle=> {
         particle.update();
    }
   
}
init();
animate();