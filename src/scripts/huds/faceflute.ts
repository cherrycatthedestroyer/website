import p5Type from "p5";
import Project from "./project";
import BodyText from "../elements/bodyText";
import PromptText from "../elements/promptText";

class Faceflute extends Project {

    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"FACEFLUTE",width,height);
        this.hudType="faceflute";
        this.escPage="projectSearch";
        this.info1= new BodyText("FaceFlute lets users creating music using facial expressions.\nFaceApi js is used to determine facial expressions which I then\nmap to musical notes using Tone Js. I originally wanted to use\nMagenta to generate different patterns rather than single\nnotes but it was not compatible with FaceApi js."
        ,13,width,height,p5);
        this.stack=new BodyText(". Javascript\n. FaceApi js\n. Tone Js",13,width,height,p5);
        this.link=new PromptText("press ENTER to view",15,width,height,p5);
        this.info1.setToPara(p5);
        this.stack.setToPara(p5);
    }

    show(p5: p5Type,isMobile:boolean) {
        super.show(p5,isMobile);
        let offset;
        isMobile?p5.scale(1.5,1.5):p5.scale(0.9,0.9);
        isMobile?offset=120:offset=0;
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-7,-220+offset,this.opacityCounter);
            this.elementCount==0? this.infoHeading.select():this.infoHeading.unselect() ;
            this.infoHeading.show(p5,-150,-170+offset,this.opacityCounter);
            this.elementCount==1? this.stackHeading.select():this.stackHeading.unselect() ;
            this.stackHeading.show(p5,-77,-170+offset,this.opacityCounter);
            this.elementCount==2? this.linkHeading.select():this.linkHeading.unselect() ;
            this.linkHeading.show(p5,0,-170+offset,this.opacityCounter);
            if (this.elementCount==0){
                this.info1.show(p5,-170,-145+offset);
            }
            else if (this.elementCount==1){
                this.stack.show(p5,-170,-145+offset);
            }
            else if (this.elementCount==2){
                this.link.show(p5,0,-80+offset,this.opacityCounter);
            }
        }
        p5.pop();
    }
}

export default Faceflute;