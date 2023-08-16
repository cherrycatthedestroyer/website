import p5Type from "p5";

class HoloText {
    width: number;
    height: number;
    font: p5Type.Font;
    inputText: string;
    tracking: number;
    yWave:number;
    yWaveSize:number; 
    yWaveLength:number; 
    yWaveSpeed:number;
    size:number;
    color: number[];
    state: string;
    x: number;
    y: number;
    name: string;
    isVisible: boolean;

    constructor(input:string, size:number,width:number, height: number, name:string, p5:p5Type) {
        this.width = width;
        this.height = height;
        this.font = p5.loadFont("assets/roboto.otf");
        this.inputText = input;
        this.size = size;
        this.tracking = size*0.625;
        this.yWave = 2;
        this.yWaveSize = 1.2;
        this.yWaveLength = 1;
        this.yWaveSpeed = 0.05;
        this.color = [196, 196, 194,200];
        this.state = "unselected";
        this.x = 0;
        this.y = 0;
        this.name = name;
        this.isVisible = true;
    }

    setTracking(tracking:number){
        this.tracking = tracking;
    }

    update(p5:p5Type){
        if (this.state === "unselected"){
            this.color[0]<196?this.color[0]+=4:this.color[0]-=4;
            this.color[1]<196?this.color[1]+=4:this.color[1]-=4;
            this.color[2]<194?this.color[2]+=4:this.color[2]-=4;
            if (this.color[0]>193&&this.color[0]<200&&this.color[1]>193&&this.color[1]<200&&this.color[2]>190&&this.color[2]<198){
                this.color[0]=196;
                this.color[1]=196;
                this.color[2]=194;
            }
        }
        else if (this.state === "selected"){
            this.color[0]<245?this.color[0]+=4:this.color[0]-=4;
            this.color[1]<212?this.color[1]+=4:this.color[1]-=4;
            this.color[2]<125?this.color[2]+=4:this.color[2]-=4;
            if (this.color[0]>241&&this.color[0]<249&&this.color[1]>208&&this.color[1]<216&&this.color[2]>121&&this.color[2]<129){
                this.color[0]=245;
                this.color[1]=212;
                this.color[2]=125;
            }
        }
        else if (this.state === "active"){
            this.color[0]<175?this.color[0]+=4:this.color[0]-=4;
            this.color[1]<245?this.color[1]+=4:this.color[1]-=4;
            this.color[2]<125?this.color[2]+=4:this.color[2]-=4;
            if (this.color[0]>171&&this.color[0]<179&&this.color[1]>241&&this.color[1]<249&&this.color[2]>121&&this.color[2]<129){
                this.color[0]=175;
                this.color[1]=245;
                this.color[2]=125;
            }
        }
        else if (this.state === "urgent"){
            this.color[0]<207?this.color[0]+=4:this.color[0]-=4;
            this.color[1]<56?this.color[1]+=4:this.color[1]-=4;
            this.color[2]<56?this.color[2]+=4:this.color[2]-=4;
            if (this.color[0]>203&&this.color[0]<211&&this.color[1]>52&&this.color[1]<60&&this.color[2]>52&&this.color[2]<60){
                this.color[0]=207;
                this.color[1]=56;
                this.color[2]=56;
            }
        }
    }

    select(){
        this.state="selected";
    }

    unselect(){
        this.state="unselected";
    }

    activate(){
        this.state="active";
    }

    highlight(){
        this.state="urgent";
    }

    dummy(){}

    isClicked(x: number, y: number,p5: p5Type,isMobile: boolean,width:number,height:number):boolean{
        this.width = width;
        this.height = height;
        let inBounds = false;
        let newX = (x - this.width/2)*1.2*1.5;
        let newY = (y - this.height/2)*1.2*1.5;
        if (isMobile===false){
            newX = (x - this.width/2)*1.2*0.9;
            newY = (y - this.height/2)*1.2*0.9;
            if (x>this.width*0.4&&x<this.width*0.6){
                if (this.name==="track1"){
                    if (y>this.height*0.2&&y<this.height*0.22){
                        return true;
                    }
                }
                else if (this.name==="track2"){
                    if (y>this.height*0.25&&y<this.height*0.27){
                        return true;
                    }
                }
                else if (this.name==="track3"){
                    if (y>this.height*0.3&&y<this.height*0.32){
                        return true;
                    }
                }
            }
        }
        if (this.name!=="page1"&&this.name!=="page2"){
            if (this.name==="back"){
                newX = (x - this.width/2);
                newY = (y - this.height/2);
            }
            if (newX>this.x-(this.inputText.length*this.tracking)/2&&newX<this.x+(this.inputText.length*this.tracking)/2&&this.isVisible===true&&
            this.name!=="track1"&&this.name!=="track2"&&this.name!=="track3"
            ){
                if (this.name==="enter"){
                    if (newY>this.y+100&&newY<this.y+150){
                        inBounds=true
                    }
                }
                else if (this.name==="back"){
                    if (newY>this.y-50&&newY<this.y+50){
                        inBounds=true
                    }
                }
                else{
                    if (newY>this.y-250&&newY<this.y+50){
                        inBounds=true
                    }
                }
            }
            //this.name==="track1"||this.name==="track2"||this.name==="track3"
            if (x>this.width*0.3&&x<this.width*0.7&&(this.name==="track1"||this.name==="track2"||this.name==="track3")){
                if (this.name==="track1"){
                    if (y>this.height*0.4&&y<this.height*0.44){
                        return true;
                    }
                }
                else if (this.name==="track2"){
                    if (y>this.height*0.48&&y<this.height*0.52){
                        return true;
                    }
                }
                else if (this.name==="track3"){
                    if (y>this.height*0.58&&y<this.height*0.62){
                        return true;
                    }
                }
            }
        }
        return inBounds;
    }

    show(p5: p5Type,x:number, y:number,opacity:number) {
        this.update(p5);
        p5.push();
        this.x = x;
        this.y = y;
        p5.translate(x,y);
        p5.translate(-(this.inputText.length-1)*this.tracking/2,0);
        p5.textFont(this.font);
        p5.textSize(this.size);
        p5.textAlign(p5.CENTER);
        for(var i = 0; i < this.inputText.length; i++){
            this.yWave = p5.sin(p5.frameCount*this.yWaveSpeed + i*this.yWaveLength)*this.yWaveSize;
            p5.fill(this.color[0],this.color[1],this.color[2],opacity);
            p5.push();
            p5.translate(i*this.tracking,0);
            p5.text(this.inputText.charAt(i),0,this.yWave);
            p5.pop();
        }
        p5.pop();
    }
}

export default HoloText;