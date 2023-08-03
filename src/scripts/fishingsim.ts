import p5Type from "p5";
import Project from "./project";
import BodyText from "./bodyText";
import PromptText from "./promptText";

class Fishingsim extends Project {

    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"FISHINGSIM",width,height);
        this.hudType="fishingsim";
        this.escPage="projectSearch";
        this.info1= new BodyText("A fishing simulator which allows the user to catch different \ntypes of fish depending on the bait used and the time of day.\nThere are some more mysterious creatures swimming around\nthat may have to be caught using different methods ..."
        ,13,width,height,p5);
        this.stack=new BodyText(". Java\n. Figma",13,width,height,p5);
        this.link=new PromptText("press ENTER to view",15,width,height,p5);
        this.info1.setToPara(p5);
        this.stack.setToPara(p5);
    }

    show(p5: p5Type) {
        super.show(p5);
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-7,-220,this.opacityCounter);
            this.elementCount==0? this.infoHeading.select():this.infoHeading.unselect() ;
            this.infoHeading.show(p5,-150,-170,this.opacityCounter);
            this.elementCount==1? this.stackHeading.select():this.stackHeading.unselect() ;
            this.stackHeading.show(p5,-77,-170,this.opacityCounter);
            this.elementCount==2? this.linkHeading.select():this.linkHeading.unselect() ;
            this.linkHeading.show(p5,0,-170,this.opacityCounter);
            if (this.elementCount==0){
                this.info1.show(p5,-170,-145);
            }
            else if (this.elementCount==1){
                this.stack.show(p5,-170,-145);
            }
            else if (this.elementCount==2){
                this.link.show(p5,0,-80,this.opacityCounter);
            }
        }
        p5.pop();
    }
}

export default Fishingsim;