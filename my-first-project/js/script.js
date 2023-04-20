alert('Welcome!');

function setup(){
    let canvas = createCanvas(500,500);
    canvas.parent("canvasContainer")
    background(200);
    
    
    
}
function draw(){
    let x=mouseX
    let y=mouseY
    if(mouseIsPressed){
        push()
        translate(x,y)
        noStroke()
        fill(random(255),random(255),random(255))
        arc(0,0,200,160,0,2*PI)
        stroke(0)
        noFill()
        arc(-45,0+20,40,50,PI,2*PI)
        arc(+55,0+20,40,50,PI,2*PI)
        arc(0,0+50,40,40,0+PI/10,PI+PI/10)
        fill(0)
        circle(0,0+25,5)
        pop()
    }
    
}