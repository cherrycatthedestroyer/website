import p5Type from "p5";
import HUD from "./hud";
import HeadingText from "./headingText";
import BodyText from "./bodyText";
import PromptText from "./promptText";

class Project extends HUD {
    infoHeading: HeadingText;
    info1: BodyText;
    stackHeading: HeadingText;
    stack: BodyText;
    linkHeading: HeadingText;
    link: PromptText;

    constructor(p5:p5Type,path:string,width:number, height:number) {
        super(p5,path,width,height);
        this.info1= new BodyText("SpaceBall is a digital pinball simulator that initially started out\nas an interface for a physical one powered by an Arduino.\nTo make use of it as a portfolio piece, I ported my original\ncode from processing to React-p5 and created a digital version\nof the pinball machine using Matter js."
        ,13,width,height,p5);
        this.stack=new BodyText(". React\n. Typescript\n. React-p5\n. Arduino\n. Processing",13,width,height,p5);
        this.link=new PromptText("press ENTER to view",15,width,height,p5);
        this.infoHeading= new HeadingText("Info",20,width,height,p5);
        this.stackHeading= new HeadingText("Stack",20,width,height,p5);
        this.linkHeading= new HeadingText("Links",20,width,height,p5);
        this.hudType="project";
        this.escPage="projectSearch";
        this.info1.setToPara(p5);
        this.stack.setToPara(p5);
    }

    show(p5: p5Type) {
        super.show(p5);
        p5.scale(0.9,0.9);
    }
}

export default Project;