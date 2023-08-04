import React from "react";
import Sketch from "react-p5";
import p5Type from "p5";
import StarField from "../scripts/elements/starField";
import Cockpit from "../scripts/cockpit";

function Canvas(){
  let starfield: StarField;
  let cockpit: Cockpit;

  const setup = (p5: p5Type, canvasParentRef: Element) =>{
    let cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    starfield = new StarField(p5.windowWidth,p5.windowHeight,50,p5);
  }

  function isMobile(p5:p5Type):boolean{
    let isMobileReso = false;
    if (p5.windowWidth<720&&p5.windowHeight<1280){
      isMobileReso = true;
    }
    return isMobileReso;
  }

  const preloader = (p5: p5Type) =>{
    cockpit = new Cockpit(p5.windowWidth,p5.windowHeight,p5);
  }

  const draw = (p5: p5Type) =>{
    p5.background(0);
    starfield.show(p5,p5.windowWidth,p5.windowHeight);
    cockpit.show(p5,isMobile(p5),p5.windowWidth,p5.windowHeight);
  }

  const handleKeyRelease = (p5: p5Type) =>{
    if(p5.keyCode == p5.LEFT_ARROW){
      cockpit.pinballEvent("lFlip");
      cockpit.handleHudEvents(p5,"LEFT");
    }
    if(p5.keyCode == p5.RIGHT_ARROW){
      cockpit.pinballEvent("rFlip");
      cockpit.handleHudEvents(p5,"RIGHT");
    }
    if(p5.keyCode == p5.ENTER){
      cockpit.handleHudEvents(p5,"ENTER");
      cockpit.pinballEvent("ENTER");
      cockpit.musicEvent("ENTER");
    }
    if(p5.keyCode == p5.ESCAPE){
      cockpit.handleHudEvents(p5,"ESC");
      cockpit.pinballEvent("ESC");
    }
    if(p5.keyCode == 32){
      cockpit.pinballEvent("move");
    }
  }

  const handleClick = (p5: p5Type) =>{
    let x = p5.mouseX;
    let y = p5.mouseY;
    if((x>0&&x<p5.windowWidth*0.45&&y>p5.windowHeight*0.2&&y<p5.windowHeight*0.8)){
      cockpit.pinballEvent("lFlip");
    }
    if((x>p5.windowWidth*0.55&&x<p5.windowWidth&&y>p5.windowHeight*0.2&&y<p5.windowHeight*0.8)){
      cockpit.pinballEvent("rFlip");
    }
    if((x>p5.windowWidth*0.45&&x<p5.windowWidth*0.55&&y>p5.windowHeight*0.2&&y<p5.windowHeight*0.8)){
      cockpit.handleHudEvents(p5,"ENTER");
      cockpit.pinballEvent("ENTER");
      cockpit.musicEvent("ENTER");
    }
    if((x>0&&x<p5.windowWidth&&y>p5.windowHeight*0.8&&y<p5.windowHeight)){
      cockpit.handleHudEvents(p5,"ESC");
      cockpit.pinballEvent("ESC");
    }
    if((x>0&&x<p5.windowWidth&&y>0&&y<p5.windowHeight*0.2)){
      cockpit.pinballEvent("move");
    }
  }

  const handleSwipe = (p5: p5Type) =>{
    let x = p5.mouseX;
    let y = p5.mouseY;
    if(p5.mouseX-p5.pmouseX<20 || p5.mouseY-p5.pmouseY<-20){
      cockpit.handleHudEvents(p5,"LEFT");
    }
    if(p5.mouseX-p5.pmouseX>-20 || p5.mouseY-p5.pmouseY>20){
      cockpit.handleHudEvents(p5,"RIGHT");
    }
  }

  const update = (p5: p5Type) =>{}

  const response= (p5: p5Type) =>{
    p5.resizeCanvas(p5.windowWidth,p5.windowHeight);
  }
  
  return(
    <Sketch 
    setup={setup} 
    draw={draw} 
    keyReleased={handleKeyRelease} 
    keyPressed={update}
    windowResized={response}
    preload={preloader}
    mouseClicked={handleClick}
    mouseDragged={handleSwipe}
  />);
}

export default Canvas;