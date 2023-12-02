import React from "react";
import Sketch from "react-p5";
import p5Type from "p5";
import StarField from "../scripts/elements/starField";
import Cockpit from "../scripts/cockpit";

function Canvas(){
  let starfield: StarField;
  let cockpit: Cockpit;

  const setup = (p5: p5Type, canvasParentRef: Element) =>{
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
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
    if (isMobile(p5)===false){
      starfield.show(p5,p5.windowWidth,p5.windowHeight);
    }
    cockpit.show(p5,isMobile(p5),p5.windowWidth,p5.windowHeight);
  }

  const handleKeyRelease = (p5: p5Type) =>{
    if(p5.keyCode === p5.LEFT_ARROW){
      cockpit.pinballEvent(p5,"lFlip");
      cockpit.handleHudEvents(p5,"LEFT",isMobile(p5));
    }
    if(p5.keyCode === p5.RIGHT_ARROW){
      cockpit.pinballEvent(p5,"rFlip");
      cockpit.handleHudEvents(p5,"RIGHT",isMobile(p5));
    }
    if(p5.keyCode === p5.ENTER){
      cockpit.handleHudEvents(p5,"ENTER",isMobile(p5));
      cockpit.pinballEvent(p5,"ENTER");
      cockpit.musicEvent("ENTER");
    }
    if(p5.keyCode === p5.ESCAPE){
      cockpit.handleHudEvents(p5,"ESC",isMobile(p5));
      cockpit.pinballEvent(p5,"ESC");
    }
    if(p5.keyCode === 32){
      cockpit.pinballEvent(p5,"move");
    }
  }

  const handleClick = (p5: p5Type) =>{
    let x = p5.mouseX;
    let y = p5.mouseY;
    let nextScreen = cockpit.hudScreens[cockpit.currentScreenIndex].handleClick(x,y,p5,isMobile(p5),p5.windowWidth, p5.windowHeight);
    let currentScreen = cockpit.hudScreens[cockpit.currentScreenIndex];
    let newScreenIndex=0;
    if (currentScreen.hudType==="spaceball"&&currentScreen.elementCount===2){
      if (cockpit.screen.state==="on"){
        if((x>0&&x<p5.windowWidth*0.45&&y>p5.windowHeight*0.2&&y<p5.windowHeight*0.8)){
          cockpit.pinballEvent(p5,"lFlip");
        }
        if((x>p5.windowWidth*0.55&&x<p5.windowWidth&&y>p5.windowHeight*0.2&&y<p5.windowHeight*0.8)){
          cockpit.pinballEvent(p5,"rFlip");
        }
        if((x>0&&x<p5.windowWidth&&y>p5.windowHeight*0.8&&y<p5.windowHeight)){
          cockpit.handleHudEvents(p5,"ESC",isMobile(p5));
          cockpit.pinballEvent(p5,"ESC");
        }
        if((x>0&&x<p5.windowWidth&&y>0&&y<p5.windowHeight*0.2)){
          cockpit.pinballEvent(p5,"move");
        }
      }
      else if (cockpit.screen.state==="off"){
        if (nextScreen==="info"||nextScreen==="stack"||nextScreen==="links"){
          if (nextScreen==="info"){
            currentScreen.elementCount=0;
          }
          else if (nextScreen==="stack"){
            currentScreen.elementCount=1;
          }
          else if (nextScreen==="links"){
            currentScreen.elementCount=2;
          }
        }
      }
      if((x>p5.windowWidth*0.45&&x<p5.windowWidth*0.55&&y>p5.windowHeight*0.2&&y<p5.windowHeight*0.8)){
        cockpit.handleHudEvents(p5,"ENTER",isMobile(p5));
        cockpit.pinballEvent(p5,"ENTER");
        cockpit.musicEvent("ENTER");
      }
    }
    else{
      if (nextScreen!==""&&nextScreen!=="info"&&nextScreen!=="stack"&&nextScreen!=="links"&&nextScreen!=="back"&&nextScreen!=="enter"&&
      nextScreen!=="track1"&&nextScreen!=="track2"&&nextScreen!=="track3"&&nextScreen!=="mediaSearch"
      ){
        cockpit.hudScreens.forEach(e => {
          if(e.hudType===nextScreen){
                newScreenIndex = cockpit.hudScreens.indexOf(e);}})
        cockpit.hudScreens[newScreenIndex].boot();
        cockpit.currentScreenIndex=newScreenIndex;
        currentScreen.close();
        cockpit.radio.ambient[1].play();
      }
      if (nextScreen==="info"||nextScreen==="stack"||nextScreen==="links"){
        if (nextScreen==="info"){
          currentScreen.elementCount=0;
        }
        else if (nextScreen==="stack"){
          currentScreen.elementCount=1;
        }
        else if (nextScreen==="links"){
          currentScreen.elementCount=2;
        }
      }
      if (nextScreen==="enter"&&currentScreen.hudType!=="home"){
        if (currentScreen.elementCount===2){
          if (currentScreen.hudType==="taskpad"){
            window.open("https://taskpad.onrender.com/", '_blank');
          }
          else if (currentScreen.hudType==="faceflute"){
            window.open("https://faceflute.onrender.com/", '_blank');
          }
          else if (currentScreen.hudType==="vibecheck"){
            window.open("https://faceflute.onrender.com/", '_blank');
          }
          else if (currentScreen.hudType==="fishingsim"){
            window.open("https://vimeo.com/700279343?share=copy", '_blank');
          }
          else if (currentScreen.hudType==="skills"){
            window.open("https://pdfhost.io/v/uPYk97dGP_joshjob_resume", '_blank');
          }
          /*
          else if (currentScreen.hudType==="malaika"){
            window.open("https://youtu.be/wwKDfcfcEOI", '_blank');
          }
          else if (currentScreen.hudType==="insupal"){
            window.open("https://vimeo.com/282667508?share=copy", '_blank');
          }
          else if (currentScreen.hudType==="crisp"){
            window.open("https://vimeo.com/282667508?share=copy", '_blank');
          }*/
        }
      }
  
      if (nextScreen==="page2"&&(currentScreen.hudType==="projectSearch")){
        currentScreen.elementCount=3;
      }
      if (nextScreen==="page1"&&(currentScreen.hudType==="projectSearch")){
        currentScreen.elementCount=0;
      }
  
      if (nextScreen==="back"&&currentScreen.hudType!=="home"){
        cockpit.hudScreens.forEach(e => {
          if(e.hudType===currentScreen.escPage){
              newScreenIndex = cockpit.hudScreens.indexOf(e);}})
        cockpit.hudScreens[newScreenIndex].boot();
        cockpit.currentScreenIndex=newScreenIndex;
        currentScreen.close();
        cockpit.radio.ambient[3].play();
      }
  
      if (currentScreen.hudType==="projectSearch"){
        if(x>0&&x<p5.windowWidth*0.25&&currentScreen.elementCount>=3){
          currentScreen.elementCount=0;
          cockpit.radio.ambient[1].play();
        }
        else if(x>p5.windowWidth*0.75&&x<p5.windowWidth&&currentScreen.elementCount<3){
          currentScreen.elementCount=3;
          cockpit.radio.ambient[1].play();
        }
      }

      if (currentScreen.hudType==="music"){
        let musicIndex = 0;
        nextScreen==="track1"?musicIndex=1:nextScreen==="track2"?musicIndex=2:nextScreen==="track3"?musicIndex=3:musicIndex=0;
        if (cockpit.radio.play(musicIndex)){
          currentScreen.setSpecialIndex(musicIndex);
        }
        else{
          if (!cockpit.radio.isPlaying){
            currentScreen.setSpecialIndex(-1);
          }
        }
      }

      if (nextScreen==="mediaSearch"&&currentScreen.hudType==="home"){
        window.open("https://youtu.be/rkBfU8_RM4o", '_blank');
      }

      if (!isMobile(p5)&&cockpit.screen.state==="off"){
        if((x>p5.windowWidth*0.25&&x<p5.windowWidth*0.35&&y>p5.windowHeight*0.8&&y<p5.windowHeight)){
          cockpit.handleHudEvents(p5,"LEFT",isMobile(p5));
        }
        if((x>p5.windowWidth*0.6&&x<p5.windowWidth*0.75&&y>p5.windowHeight*0.8&&y<p5.windowHeight)){
          cockpit.handleHudEvents(p5,"RIGHT",isMobile(p5));
        }
      }
    }
  }

  const handleSwipe = (p5: p5Type) =>{
    if(p5.mouseX-p5.pmouseX<40){
      cockpit.handleHudEvents(p5,"LEFT",isMobile(p5));
    }
    if(p5.mouseX-p5.pmouseX>-40){
      cockpit.handleHudEvents(p5,"RIGHT",isMobile(p5));
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