import p5Type from "p5";

class Element {
    floater: number;
    width: number;
    height: number;
    rate: number;
    image: p5Type.Image;
    imageSelected: p5Type.Image;
    isSelected: boolean;
    in_width:number;
    in_height:number;
    ogWidth:number;
    ogHeight:number;

    constructor(path1:string, path2:string, p5:p5Type, rate:number,width:number,height:number) {
        this.floater = 0;
        this.image = p5.loadImage(path1);
        this.imageSelected = p5.loadImage(path2);
        this.width = this.image.width;
        this.height = this.image.height;
        this.isSelected = true;
        this.rate = rate;
        this.in_width=width;
        this.in_height=height;
        this.ogWidth=1368;
        this.ogHeight=755;
    }

    update(p5: p5Type){
        this.floater+=Math.PI/2*this.rate;
        if (this.floater>Math.PI*2){
            this.floater=0;
        }
    }

    resize(width:number, height:number){
        this.width = width;
        this.height = height;
    }

    select(){
        this.isSelected=true;
    }

    unselect(){
        this.isSelected=false;
    }

    show(p5: p5Type, x:number, y:number) {
        p5.push();
        this.update(p5);
        //p5.scale(this.in_width/this.ogWidth,this.in_height/this.ogHeight);
        p5.translate(x-this.width/2,y+p5.map(Math.sin(this.floater)-this.height/2,-1,1,-5,5));
        this.isSelected? p5.image(this.imageSelected,0,0):
        p5.image(this.image,0,0);
        p5.pop();
    }
}

export default Element;