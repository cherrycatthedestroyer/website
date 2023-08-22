import p5Type from "p5";

class BodyText{
    alignType: string;
    text: string;
    size: number;
    width:number;
    height: number;
    font: p5Type.Font;
    constructor(input:string, size:number,width:number, height: number, p5:p5Type) {
        this.font = p5.loadFont("assets/robotoReg.otf");
        this.alignType = "center";
        this.text=input;
        this.size=size;
        this.width = width;
        this.height = height;
    }
    setToPara(p5:p5Type){
        this.alignType = "left";
    }
    show(p5: p5Type,x:number, y:number) {
        p5.push();
        p5.translate(x,y);
        p5.fill(255);
        this.alignType==="center"?p5.textAlign(p5.CENTER):p5.textAlign(p5.LEFT);
        p5.textFont(this.font);
        p5.textSize(this.size);
        p5.text(this.text,0,0);
        p5.pop();
    }
}

export default BodyText;