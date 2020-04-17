let contacolor = 0;
let data = 1;
let x = 0;
let speed = 1

let c1, c2;
let nuage;

let nuages = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0 ; i < 10 ; ++i)
  		nuages[i]= new Nuage( random(-2000, 0) , random(20, windowHeight / 2), random(100, 200 ),random(20, 30), random(200, 255) ) ;
	
	

}

let xOff = 0.0;

function draw() {



	c1 = color(194, 240, 237);
	c2 = color(70, 93, 130, 0.4);
	setGradient(c1, c2); 

	clouds();
	waves();

	  
}


function clouds(){


	for(let i = nuages.length - 1; i >= 0; --i){
	nuages[i].fly();
	nuages[i].show();
  	}	
  	xOff = 0.0;
}



function setGradient(c1, c2) {


  	noFill();
 	for (let y = 0; y < windowHeight ; y++) {
    let inter = map(y, 0, windowHeight, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, windowWidth, y);
  }
}
	


////////////////////////////////////////////////////////////////////////////////////

function waves(){

angleMode(DEGREES);

	
		strokeWeight(5);
		stroke(70, 93, 130, 90);
		noFill();

		beginShape ();

		let spacing = map(mouseY, 0, height / 2 , 0, 10);

		for (let a = 0; a < 360; a += spacing) {
				
			let x = 100 * tan(a) + (mouseX - width/4) + width/2;
			let y = 300 * cos(a) + height ;

			let x2 = 100 * tan(a) + (mouseX - width/4) +windowWidth/4 ;
			let y2 = 400 * cos(a) + height;

			vertex(x, y);
			vertex(x2, y2);
			}
		endShape (CLOSE);

}

////////////////////////////////////////////////////////////////////////////////////

class Nuage{




	constructor(x, y, larg, long, couleur){

		this.x = x;
		this.y = y;
		this.larg = larg;
		this.long = long;	

		this.x2 = random(this.x, this.x+this.larg);
		this.y2 = random(this.y, this.y+this.long);
		this.larg2 = random(100, 200);
		this.long2 = random(30, 40);

		this.x3 = random(this.x2, this.x2 + this.larg2);
		this.y3 = random(this.y2, this.y2 + this.long2);
		this.larg3 = random(100, 200);
		this.long3 = random(30, 40);

		this.history = []; 
		this.couleur = couleur;

	}






	fly(){

	let nebulus = 0.0005;
	let cirrus = 0.0008;
	let cumulus = 0.0002;
	let stratus = 0.05;

	let nebulus_size = noise(millis() * nebulus) * 40;
	let cirrus_size = noise(millis() * cirrus) * 70;
	let nuage_x = noise(millis() * cumulus) * width;
	let nuage_y = noise(millis() * stratus);

	print(nuage_y);
	let r = floor(random(0,2));
	
	if(r == 1){
		this.y -= nuage_y;
		this.y2 -= nuage_y;
		this.y3 -= nuage_y;
	}
	else{
		this.y += nuage_y;
		this.y2 += nuage_y;
		this.y3 += nuage_y;

	}

	xOff+=stratus;

		this.x = this.x + speed;
		this.x2 = this.x2 + speed;
		this.x3 = this.x3 + speed;


		if(this.x > windowWidth){
			this.x = 0
			this.x2 = random(this.x, this.x+this.larg);
			this.x3 = random(this.x2, this.x2 + this.larg2);
		}

	}

	show(){
	noStroke();
	fill(this.couleur, 50);
	ellipse (this.x, this.y, this.larg, this.long);
	ellipse (this.x2, this.y2, this.larg2, this.long2);
	ellipse (this.x3, this.y3, this.larg3, this.long3);

	}

}