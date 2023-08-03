import p5Type from "p5";
import HoloText from "./holoText";

class PromptText extends HoloText {
    constructor(input:string, size:number,width:number, height: number, p5:p5Type) {
        super(input,size,width,height,p5);
        this.font = p5.loadFont("assets/robotoB.otf");
        this.tracking = size-7;
        this.yWave = 1;
        this.yWaveSize = 0.6;
        this.yWaveLength = 1;
        this.yWaveSpeed = 0.05;
    }
}

export default PromptText;