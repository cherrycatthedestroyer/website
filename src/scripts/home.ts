import p5Type from "p5";
import Element from "./element";
import HUD from "./hud";

class Home extends HUD {
    homeElement1: Element;
    homeElement2: Element;
    homeElement3: Element;
    enterElement: Element;

    constructor(p5:p5Type, width:number, height:number) {
        super(p5,"assets/cleaned/home_logo.gif",width,height);
        this.homeElement1 = new Element("assets/cleaned/home_element_project_unselected.gif",
        "assets/cleaned/home_element_project_selected.gif", p5, 0,width,height);
        this.homeElement2 = new Element("assets/cleaned/home_element_skills_unselected.gif",
        "assets/cleaned/home_element_skills_selected.gif", p5, 0,width,height);
        this.homeElement3 = new Element("assets/cleaned/home_element_music_unselected.gif",
        "assets/cleaned/home_element_music_selected.gif", p5, 0,width,height);
        this.enterElement = new Element("assets/cleaned/selecter_prompt.gif",
        "assets/cleaned/selecter_prompt.gif", p5, 0.02,width,height);
        this.homeElement2.unselect();
        this.homeElement3.unselect();
        this.hudType="home";
        this.elementList = ["projectSearch","skills","music"];
    }

    show(p5: p5Type) {
        super.show(p5);
        p5.scale(0.9,0.9);
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-180,-300);
            this.elementCount==0? this.homeElement1.select():this.homeElement1.unselect() ;
            this.homeElement1.show(p5,-160,-160);
            this.elementCount==1? this.homeElement2.select():this.homeElement2.unselect() ;
            this.homeElement2.show(p5,-40,-160);
            this.elementCount==2? this.homeElement3.select():this.homeElement3.unselect() ;
            this.homeElement3.show(p5,60,-160);
            this.enterElement.show(p5,-80,-50);
        }
        p5.pop();
    }
}

export default Home;