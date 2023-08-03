import React from "react";
import Sketch from "react-p5";
import p5Type from "p5";
import StarField from "../scripts/starField";
import Cockpit from "../scripts/cockpit";

function Canvas(){
  let starfield: StarField;
  let cockpit: Cockpit;

  const setup = (p5: p5Type, canvasParentRef: Element) =>{
    let cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    starfield = new StarField(p5.windowWidth,p5.windowHeight,50,p5);
  }

  const preloader = (p5: p5Type) =>{
    cockpit = new Cockpit(p5.windowWidth,p5.windowHeight,p5);
  }

  const draw = (p5: p5Type) =>{
    p5.background(0);
    starfield.show(p5);
    cockpit.show(p5);
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
    if (cockpit.screen.state=="on"){
      if((x>0&&x<p5.windowWidth/2&&y>p5.windowHeight*0.2&&y<p5.windowHeight*0.6)){
        cockpit.pinballEvent("lFlip");
        cockpit.handleHudEvents(p5,"LEFT");
      }
      if((x>p5.windowWidth/2&&x<p5.windowWidth&&y>p5.windowHeight*0.2&&y<p5.windowHeight*0.6)){
        cockpit.pinballEvent("rFlip");
        cockpit.handleHudEvents(p5,"RIGHT");
      }
      if((x>0&&x<p5.windowWidth&&y>p5.windowHeight*0.8&&y<p5.windowHeight)){
        cockpit.handleHudEvents(p5,"ESC");
        cockpit.pinballEvent("ESC");
      }
      if((x>0&&x<p5.windowWidth&&y>0&&y<p5.windowHeight*0.2)){
        cockpit.pinballEvent("move");
      }
    }
    else{  
      let xScale = p5.windowWidth/786;
      let yScale= p5.windowHeight/608;
      let xOffset = p5.windowWidth/2;
      let yOffset = p5.windowHeight/2;
      if((x>-190*xScale+xOffset&&x<-90*xScale+xOffset&&y>160*yScale+yOffset&&y<260*yScale+yOffset)){
        cockpit.pinballEvent("lFlip");
        cockpit.handleHudEvents(p5,"LEFT");
      }
      if((x>90*xScale+xOffset&&x<190*xScale+xOffset&&y>160*yScale+yOffset&&y<260*yScale+yOffset)){
        cockpit.pinballEvent("rFlip");
        cockpit.handleHudEvents(p5,"RIGHT");
      }
      if((x>-155*xScale+xOffset&&x<145*xScale+xOffset&&y>-310*yScale+yOffset&&y<-10*yScale+yOffset)){
        cockpit.handleHudEvents(p5,"ENTER");
        cockpit.pinballEvent("ENTER");
        cockpit.musicEvent("ENTER");
      }
      if((x>-30*xScale+xOffset&&x<20*xScale+xOffset&&y>115*yScale+yOffset&&y<165*yScale+yOffset)){
        cockpit.handleHudEvents(p5,"ESC");
        cockpit.pinballEvent("ESC");
      }
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
  />);
}

export default Canvas;