import p5Type from "p5";
import HUD from "./hud";
import Element from "./element";

class Project extends HUD {
    infoHeading: Element;
    info: Element;
    stackHeading: Element;
    stack: Element;
    linkHeading: Element;
    link: Element;

    constructor(p5:p5Type,path:string,width:number, height:number) {
        super(p5,path,width,height);
        this.info=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/placeholder.png", p5, 0,width,height);
        this.stack=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/placeholder.png", p5, 0,width,height);
        this.link=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/placeholder.png", p5, 0,width,height);
        this.infoHeading=new Element("assets/cleaned/project_info_unselected.gif",
        "assets/cleaned/project_info_selected.gif", p5, 0,width,height);
        this.stackHeading=new Element("assets/cleaned/project_stack_unselected.gif",
        "assets/cleaned/project_stack_selected.gif", p5, 0,width,height);
        this.linkHeading=new Element("assets/cleaned/project_links_unselected.gif",
        "assets/cleaned/project_links_selected.gif", p5, 0,width,height);
        this.hudType="project";
        this.escPage="projectSearch";
    }

    show(p5: p5Type) {
        super.show(p5);
        p5.scale(0.9,0.9);
    }
}

export default Project;