

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

let camera, scene, renderer;
let controls;

let screenDepth=5;
const getHTMLElement=(id)=>{
	const el=document.getElementById(id);
	const width=el.offsetWidth;
	const height=el.offsetHeight;
	
	console.log(height);
	console.log(width);
	const content= new CSS3DObject(el);
	//content.side=THREE.DoubleSide;
	return {content,height,width};
}
const createCuboid=(width,height,depth)=>{
	const group = new THREE.Group();
	group.add(Element(width+"px",height+"px",				0, 0,depth, 0));				//front
	group.add(Element(depth+"px",height+"px",			width/2, 0, 0, Math.PI / 2));		//right
	group.add(Element(width+"px",height+"px",0, 0, 		-depth, Math.PI));			//back
	group.add(Element(depth+"px",height+"px",			- width/2, 0, 0, - Math.PI / 2));	//right
	
	const top=Element(width+"px",depth+"px",							-depth, height/2,depth, 0);
	top.rotateX(Math.PI / 2);
	const bottom=Element(width+"px",depth+"px",							-depth, -height/2,depth, 0);
	bottom.rotateX(Math.PI / 2);
	
	group.add(top);
	group.add(bottom);
	
	
	return group;
	
	
}
const createRoom=(width,height,depth)=>{
	const group = new THREE.Group();
	group.add(wall(width+"px",height+"px",				0, 0,depth/2, 0));				//front
	group.add(wall(depth+"px",height+"px",			width/2, 0, 0, Math.PI / 2));		//right
	group.add(wall(width+"px",height+"px",0, 0, 		-depth/2, Math.PI));			//back
	group.add(wall(depth+"px",height+"px",			- width/2, 0, 0, - Math.PI / 2));	//right
	
	const top=ceiling(width+"px",depth+"px",							0, height/2,0, 0);
	top.rotateX(Math.PI / 2);
	const bottom=floor(width+"px",depth+"px",							0, -height/2,0, 0);
	bottom.rotateX(Math.PI / 2);
	
	group.add(top);
	group.add(bottom);
		
	return group;
}

const createTable=(width,height,depth)=>{
	const group = new THREE.Group();
	group.add(table(width+"px",height+"px",				0, 0,depth/2, 0));				//front
	group.add(table(depth+"px",height+"px",			width/2, 0, 0, Math.PI / 2));		//right
	group.add(table(width+"px",height+"px",0, 0, 		-depth/2, Math.PI));			//back
	group.add(table(depth+"px",height+"px",			- width/2, 0, 0, - Math.PI / 2));	//right
	
	const top=table(width+"px",depth+"px",							0, height/2,0, 0);
	top.rotateX(Math.PI / 2);
	const bottom=table(width+"px",depth+"px",							0, -height/2,0, 0);
	bottom.rotateX(Math.PI / 2);
	
	group.add(top);
	group.add(bottom);

	return group;
}

const createScreen=(object)=>{
	const width=object.width;
	const height=object.height;
	const cuboid=createCuboid(width,height,screenDepth);
	cuboid.position.x=30
	cuboid.position.z=-10;
	cuboid.position.y=+30;
	
	object.content.add(cuboid);
	return object.content;
}
const Element=(width,height,x, y, z, ry )=>{
	const div = document.createElement( 'div' );
	div.classList.add("black")
	div.style.width = width;
	div.style.height = height;
	
	const iframe = document.createElement( 'iframe' );
	iframe.style.width = width;
	iframe.style.height = height;
	iframe.style.border = '0px';
	//div.appendChild( iframe );
	
	const object = new CSS3DObject( div );
	object.position.set( x, y, z );
	object.rotation.y = ry;
	
	return object;
}
const wall=(width,height,x, y, z, ry )=>{
	const div = document.createElement( 'div' );
	div.classList.add("wall")
	div.style.width = width;
	div.style.height = height;
	
	
	const object = new CSS3DObject( div );
	object.position.set( x, y, z );
	object.rotation.y = ry;
	
	return object;
}
const floor=(width,height,x, y, z, ry )=>{
	const div = document.createElement( 'div' );
	div.classList.add("floor")
	div.style.width = width;
	div.style.height = height;
	
	const object = new CSS3DObject( div );
	object.position.set( x, y, z );
	object.rotation.y = ry;
	
	return object;
}
const ceiling=(width,height,x, y, z, ry )=>{
	const div = document.createElement( 'div' );
	div.classList.add("ceiling")
	div.style.width = width;
	div.style.height = height;
	
	const object = new CSS3DObject( div );
	object.position.set( x, y, z );
	object.rotation.y = ry;
	
	return object;
}
const table=(width,height,x, y, z, ry )=>{
	const div = document.createElement( 'div' );
	div.classList.add("table")
	div.style.width = width;
	div.style.height = height;
	
	const object = new CSS3DObject( div );
	object.position.set( x, y, z );
	object.rotation.y = ry;
	
	return object;
}


const init=()=>{
	const container = document.getElementById( 'container' );
	
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 3000 );
	camera.position.set( 150, 25, 900 );
	//controls.target.set(0,-300,-500);
	scene = new THREE.Scene();
	scene.background = new THREE.Color( "black" );
	
	renderer = new CSS3DRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	//const group = new THREE.Group();
	//group.add(Element('yfUWGLZPa7Y', 0, 0, 240, 0));
	//group.add(Element('TkmO4AVLrIA', 240, 0, 0, Math.PI / 2));
	//group.add(Element('7GAp9HgRUCw', 0, 0, - 240, Math.PI));
	//group.add(Element('L5tnRo8joqo', - 240, 0, 0, - Math.PI / 2));
	//scene.add( group );
	
	// scene.add(createScreen(getHTMLElement("experience")));
	// scene.add(createScreen(getHTMLElement("formation")));
	// scene.add(createScreen(getHTMLElement("competences")));
	const section=[
		getHTMLElement("experience"),
		getHTMLElement("formation"),
		getHTMLElement("competences")
	]
	const experience=createScreen(section[0]);
	const formation=createScreen(section[1]);
	const competences=createScreen(section[2]);
	

	

	const box=createRoom(3000,2500,3000);
	box.position.y=500
	scene.add(box)


	const tableLegFrontLeft=createTable(30,600,30);
	tableLegFrontLeft.position.x=-650;
	tableLegFrontLeft.position.y=-300;
	tableLegFrontLeft.position.z=250;
	const tableLegFrontRight=createTable(30,600,30);
	tableLegFrontRight.position.x=+650;
	tableLegFrontRight.position.y=-300;
	tableLegFrontRight.position.z=250;

	const tableLegBackLeft=createTable(30,600,30);
	tableLegBackLeft.position.x=-650;
	tableLegBackLeft.position.y=-300;
	tableLegBackLeft.position.z=-250;
	const tableLegBackRight=createTable(30,600,30);
	tableLegBackRight.position.x=+650;
	tableLegBackRight.position.y=-300;
	tableLegBackRight.position.z=-250;

	const tableTop=createTable(1500,10,700);
	tableTop.position.y=-160
	tableTop.position.z=200


	tableTop.add(tableLegFrontLeft);
	tableTop.add(tableLegFrontRight);
	tableTop.add(tableLegBackLeft);
	tableTop.add(tableLegBackRight);

	const citation=getHTMLElement("citation").content;
	const contact=getHTMLElement("contact").content;
	const photo=getHTMLElement("photo").content;
	const dossier=new THREE.Group();
	dossier.add(photo);
	dossier.add(citation);
	dossier.add(contact);
	contact.position.y=-100;
	
	citation.position.x=150;
	photo.position.x=citation.position.x+125;
	citation.rotateZ(-15*Math.PI/180);
	photo.rotateZ(-30*Math.PI/180);
	dossier.position.y=10;
	dossier.position.x=100;
	dossier.position.z=100
	dossier.rotateX(-90*Math.PI/180);
	dossier.rotateZ(-15*Math.PI/180);
	tableTop.add(dossier);

	scene.add(tableTop);

	formation.position.y=20
	experience.position.x=-500;
	competences.position.x=500
	
	scene.rotateX(8*Math.PI/180);


	scene.add(experience);
	scene.add(formation);
	scene.add(competences);

	scene.position.z=-100

	controls = new OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle =120*Math.PI/180;
	controls.maxDistance=1400;
	controls.minDistance=250;
	//camera.position.set( 150, 25, 900 );

	window.addEventListener( 'resize', onWindowResize );
	
	// Block iframe events when dragging camera
	
	const blocker = document.getElementById( 'blocker' );
	blocker.style.display = 'none';
	
	controls.addEventListener( 'start', function () {
		
		blocker.style.display = '';
		
	} );
	controls.addEventListener( 'end', function () {
		
		blocker.style.display = 'none';
		
	} );
}

const onWindowResize=()=>{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

const animate=()=>{
	requestAnimationFrame( animate );
	
	controls.update();
	renderer.render( scene, camera );

}

init();
animate();