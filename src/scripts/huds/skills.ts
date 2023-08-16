import p5Type from "p5";
import Project from "./project";
import BodyText from "../elements/bodyText";
import PromptText from "../elements/promptText";

class Skills extends Project {
    stack2:BodyText;
    stack3:BodyText;
    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"SKILLS",width,height);
        this.hudType="skills";
        this.escPage="home";
        this.info1= new BodyText("I am an accomplished Front-End Developer who enjoys making\nfun and engaging user experiences. My passion for learning\nnew IDE’s allow me to understand my workspace fast, while\nmy artistic design background allows me to create visually\nstunning applications. Let's make something interesting!"
        ,13,width,height,p5);
        this.stack=new BodyText(". HTML\n. CSS\n. Javascript\n. Typescript\n. Java",13,width,height,p5);
        this.stack2=new BodyText(". EJS\n. React\n. Node\n. P5js\n. Next",13,width,height,p5);
        this.stack3=new BodyText(". Figma\n. Photoshop\n. AfterEffects\n. Premiere\n. Reaper",13,width,height,p5);
        this.link=new PromptText("press ENTER to view resume",15,width,height,"enter",p5);
        this.info1.setToPara(p5);
        this.stack.setToPara(p5);
        this.stack2.setToPara(p5);
        this.stack3.setToPara(p5);
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
            this.elementCount==2? this.linkHeading.select():this.linkHeading.unselect() ;
            this.linkHeading.show(p5,0+offsetX,-170+offset+offset2,this.opacityCounter);
            if (this.elementCount==0){
                isMobile?p5.scale(1.5,1):p5.scale(1,1);
                this.info1.show(p5,-170+infoOffset,-145+offset+offset2);
            }
            else if (this.elementCount==1){
                isMobile?p5.scale(1.5,1):p5.scale(1,1);
                this.stack.show(p5,-170+infoOffset,-145+offset+offset2);
                this.stack2.show(p5,-90+infoOffset,-145+offset+offset2);
                this.stack3.show(p5,-10+infoOffset,-145+offset+offset2);
            }
            else if (this.elementCount==2){
                this.link.show(p5,0,-80+offset,this.opacityCounter);
            }
        }
        p5.pop();
    }
}

export default Skills;