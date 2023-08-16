import p5Type from "p5";
import HoloText from "./holoText";

class HeadingText extends HoloText {
    constructor(input:string, size:number,width:number, height: number, name:string, p5:p5Type) {
        super(input,size,width,height,name,p5);
        this.font = p5.loadFont("assets/kanit.otf");
        this.yWaveSize = p5.random(0.6,0.7);
    }
}

export default HeadingText;