import p5Type from "p5";
import Project from "./project";

class Spaceball extends Project {

    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"SPACEBALL",width,height);
        this.hudType="spaceball";
        this.escPage="projectSearch";
    }
 
    show(p5: p5Type,isMobile:boolean) {
        super.show(p5,isMobile);
        let offset,offsetX,offset2,infoOffset;
        isMobile?p5.scale(1.5,1.5):p5.scale(0.9,0.9);
        isMobile?offset=120:offset=0;
        isMobile?offsetX=-60:offsetX=0;
        isMobile?offset2=-20:offset2=0;
        isMobile?infoOffset=+15:infoOffset=0;
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-7,-220+offset,this.opacityCounter);
            this.elementCount==0? this.infoHeading.select():this.infoHeading.unselect() ;
            this.infoHeading.show(p5,-150+offsetX,-170+offset+offset2,this.opacityCounter);
            this.elementCount==1? this.stackHeading.select():this.stackHeading.unselect() ;
            this.stackHeading.show(p5,-77+offsetX,-170+offset+offset2,this.opacityCounter);
            this.elementCount==2? this.linkHeading.select():this.linkHeading.unselect();
            this.linkHeading.show(p5,0+offsetX,-170+offset+offset2,this.opacityCounter);
            if (this.elementCount==0){
                isMobile?p5.scale(1.5,1):p5.scale(1,1);
                this.info1.show(p5,-170+infoOffset,-145+offset+offset2);
            }
            else if (this.elementCount==1){
                isMobile?p5.scale(1.5,1):p5.scale(1,1);
                this.stack.show(p5,-170+infoOffset,-145+offset+offset2);
            }
            else if (this.elementCount==2){
                this.link.show(p5,0,-80+offset+offset2,this.opacityCounter);
            }
        }
        p5.pop();
    }
}

export default Spaceball;