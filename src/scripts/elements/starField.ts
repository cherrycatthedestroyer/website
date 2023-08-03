import p5Type from "p5";
import Star from "./star";

class StarField {
    width: number;
    height: number;
    count: number;
    stars: Star[];

    constructor(width:number, height: number, count: number, p5:p5Type) {
        this.width = width;
        this.height= height;
        this.count = count;
        this.stars = [];
        this.populate(p5);
    }

    populate(p5: p5Type){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < this.count/3; j++) {
                if (i == 0){
                    this.stars.push(this.createStar("s",p5));
                }

                else if (i == 1){
                    this.stars.push(this.createStar("m",p5));
                }

                else if (i == 2){
                    this.stars.push(this.createStar("l",p5));
                }
            }
        }
    }

    createStar(size:string, p5:p5Type){
        let randPosX = this.width/2;
        let randPosY = this.height/2;
        let randVel = p5.createVector
        (this.randSign(p5,p5.random(10)),this.randSign(p5,p5.random(10))).normalize().setMag(p5.random(1,2));
        let randR = p5.random(0.5,2);
        let randAlpha = p5.random(30,100);

        if (size == "m"){
            randVel = randVel.normalize().setMag(p5.random(2,3));
            randR = p5.random(2.5,3);
            randAlpha = p5.random(100,180);
        }

        else if (size == "l"){
            randVel = randVel.normalize().setMag(p5.random(3,4));
            randR = p5.random(3.5,4);
            randAlpha = p5.random(220,250);
        }

        return new Star(randPosX, randPosY, randR, randAlpha,
            randVel, p5.createVector(this.width, this.height));
    }

    update(p5:p5Type){
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].move();
            this.stars[i].show(p5);
            if (this.stars[i].isOut==true){
                this.stars[i]=this.createStar(this.randSize(p5),p5);
            }
        }
    }

    randSign(p5:p5Type, input:number){
        let signer = p5.int(p5.random(0,2));
        if (signer==1){
            return (input*-1);
        }
        return input;
    }

    randSize(p5:p5Type){
        let sizer = p5.int(p5.random(3));
        if (sizer == 0){
            return "s";
        }
        else if (sizer == 1){
            return "m";
        }
        return "l";
    }

    show(p5: p5Type,width:number,height:number) {
        this.width=width;
        this.height=height;
        this.update(p5);
    }
}

export default StarField;