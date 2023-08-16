import p5Type from "p5";
import Screen from "./screen";
import Home from "./huds/home";
import ProjectSearch from "./huds/projectSearch";
import HUD from "./huds/hud";
import Spaceball from "./huds/spaceball";
import Taskpad from "./huds/taskpad";
import Faceflute from "./huds/faceflute";
import Vibecheck from "./huds/vibecheck";
import Fishingsim from "./huds/fishingsim";
import Music from "./huds/music";
import MusicPlayer from "./musicPlayer";
import Skills from "./huds/skills";

class Cockpit {
    width: number;
    height: number;
    cockpitAngle: number;
    cockpitImg: p5Type.Image;
    screen: Screen;
    hudScreens: HUD[];
    radio: MusicPlayer;
    currentScreenIndex: number;

    constructor(width:number, height: number, p5:p5Type) {
        this.width = width;
        this.height = height;
        this.cockpitAngle = 0;
        this.cockpitImg = p5.loadImage("assets/cockpit.png");
        this.screen = new Screen(width,height,p5);
        this.hudScreens = 
        [new Home(p5,width,height),
            new ProjectSearch(p5,width,height),new Spaceball(p5,width,height), new Taskpad(p5,width,height), 
            new Faceflute(p5,width,height), new Vibecheck(p5,width,height), new Fishingsim(p5,width,height),
            new Music(p5,width,height), new Skills(p5,width,height)
        ];
        this.radio = new MusicPlayer(p5);
        this.hudScreens[0].boot();
        this.currentScreenIndex = 0;
    }

    update(p5: p5Type){
        this.cockpitAngle+=Math.PI/2*0.01;
        if (this.cockpitAngle>Math.PI*2){
            this.cockpitAngle=0;
        }
    }

    showHuds(p5: p5Type,isMobile:boolean){
        this.hudScreens.forEach( e => e.show(p5,isMobile));
    }

    handleHudEvents(p5: p5Type, action:string,isMobile:boolean){
        let currentScreen = this.hudScreens[this.currentScreenIndex];
        let newScreenIndex=0;
        if(this.screen.state=="off"){
            if (action=="LEFT"){currentScreen.leftClick(p5);isMobile===false?this.radio.ambient[2].play():currentScreen.logo.dummy();}
            if (action=="RIGHT"){currentScreen.rightClick(p5);isMobile===false?this.radio.ambient[2].play():currentScreen.logo.dummy();}
            if (action=="ENTER"&&currentScreen.escPage!="projectSearch"
            &&currentScreen.hudType!="music"&&currentScreen.hudType!="skills"){
                this.hudScreens.forEach(e => {
                    if(e.hudType==currentScreen.elementList[currentScreen.elementCount]){
                        newScreenIndex = this.hudScreens.indexOf(e);}})
                this.hudScreens[newScreenIndex].boot();
                this.currentScreenIndex=newScreenIndex;
                currentScreen.close();
                this.radio.ambient[1].play();
            }
            if (action=="ESC"&&currentScreen.hudType!="home"){
                this.hudScreens.forEach(e => {
                    if(e.hudType==currentScreen.escPage){
                        newScreenIndex = this.hudScreens.indexOf(e);}})
                this.hudScreens[newScreenIndex].boot();
                this.currentScreenIndex=newScreenIndex;
                currentScreen.close();
                this.radio.ambient[3].play();
            }
        }
    }

    pinballEvent(action: string){
        let currentScreen = this.hudScreens[this.currentScreenIndex];
        if (currentScreen.hudType=="spaceball"){
            if ((action=="ENTER"||action=="ESC")&&currentScreen.elementCount==2&&this.screen.state=="off"){
                this.screen.pinballEvent(action);
                this.radio.ambient[5].play();
                this.radio.ambient[6].play();
            }
            else if (this.screen.state=="on"){
                this.screen.pinballEvent(action);
                this.radio.ambient[2].play();
            }
        }
        else if (currentScreen.hudType=="taskpad"){
            if (action==="ENTER"&&currentScreen.elementCount===2){
                window.open("https://taskpad.onrender.com/", '_blank');
            }
        }
        else if (currentScreen.hudType=="faceflute"){
            if (action==="ENTER"&&currentScreen.elementCount===2){
                window.open("https://faceflute.onrender.com/", '_blank');
            }
        }
        else if (currentScreen.hudType=="vibecheck"){
            if (action==="ENTER"&&currentScreen.elementCount===2){
                window.open("https://faceflute.onrender.com/", '_blank');
            }
        }
        else if (currentScreen.hudType=="fishingsim"){
            if (action==="ENTER"&&currentScreen.elementCount===2){
                window.open("https://vimeo.com/700279343?share=copy", '_blank');
            }
        }
        else if (currentScreen.hudType==="skills"){
            if (action==="ENTER"&&currentScreen.elementCount===2){
                window.open("https://pdfhost.io/v/uPYk97dGP_joshjob_resume", '_blank');
            }
        }
    }

    musicEvent(action: string){
        let currentScreen = this.hudScreens[this.currentScreenIndex];
        if (currentScreen.hudType=="music"&&action=="ENTER"){
            if (this.radio.play(currentScreen.elementCount)){
                currentScreen.setSpecialIndex(currentScreen.elementCount);
            }
            else{
                if (!this.radio.isPlaying){
                    currentScreen.setSpecialIndex(-1);
                }
            }
        }
    }

    show(p5: p5Type,isMobile:boolean,width:number,height:number) {
        this.width=width;
        this.height=height;
        p5.push();
        p5.translate(this.width/2,this.height/2);
        p5.scale(1.2);
        this.update(p5);
        let calcAngle = p5.map(Math.sin(this.cockpitAngle),-1,1,p5.radians(-Math.PI/2),p5.radians(Math.PI/2));
        if (isMobile===false){
            p5.rotate(calcAngle);
            p5.image(this.cockpitImg,-this.width/2,-this.height/2,this.width,this.height);
        }
        p5.scale(this.width/1368,this.height/755);
        this.radio.show(p5,isMobile);
        this.showHuds(p5,isMobile);
        this.screen.show(p5,isMobile);
        p5.pop();
    }
}

export default Cockpit;