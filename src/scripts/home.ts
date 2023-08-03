import p5Type from "p5";
import HUD from "./hud";
import HeadingText from "./headingText";
import PromptText from "./promptText";

class Home extends HUD {
    homeElement1: HeadingText;
    homeElement2: HeadingText;
    homeElement3: HeadingText;
    enterElement: PromptText;

    constructor(p5:p5Type, width:number, height:number) {
        super(p5,"JOSH JOB",width,height);
        this.homeElement1 = new HeadingText("Projects",20,width,height,p5);
        this.homeElement2 = new HeadingText("Skills",20,width,height,p5);
        this.homeElement3 = new HeadingText("Music",20,width,height,p5);
        this.enterElement = new PromptText("Press ENTER to select",15,width,height,p5);
        this.homeElement1.select();
        this.homeElement2.unselect();
        this.homeElement3.unselect();
        this.hudType="home";
        this.elementList = ["projectSearch","skills","music"];
        //this.logo.setTracking(this.logo.tracking*0.8);
    }

    show(p5: p5Type) {
        super.show(p5);
        p5.scale(0.9,0.9);
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-7,-220,this.opacityCounter);
            this.elementCount==0? this.homeElement1.select():this.homeElement1.unselect() ;
            this.homeElement1.show(p5,-120,-160,this.opacityCounter);
            this.elementCount==1? this.homeElement2.select():this.homeElement2.unselect() ;
            this.homeElement2.show(p5, 0,-160,this.opacityCounter);
            this.elementCount==2? this.homeElement3.select():this.homeElement3.unselect() ;
            this.homeElement3.show(p5,110,-160,this.opacityCounter);
            this.enterElement.show(p5,-14,-50,this.opacityCounter);
        }
        p5.pop();
    }
}

export default Home;