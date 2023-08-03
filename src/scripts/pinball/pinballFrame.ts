import p5Type from "p5";
import {World} from "matter-js";
import Boundary from "./boundary";
import Bumper from "./bumper";
import Ball from "./ball";

class PinballFrame {
    score: number;
    leftMain: Boundary;
    rightMain: Boundary;
    topMain: Boundary;
    leftBarricade: Boundary;
    rightBarricade: Boundary;
    bumpers: Bumper[];
    world: World;

    constructor(world: World) {
        this.score = 0;
        this.world = world;
        this.leftMain = new Boundary(-123, -10, 30, 300, world);
        this.rightMain = new Boundary(123, -10, 30, 300, world);
        this.topMain = new Boundary(0, -170, 276, 30, world);
        this.leftBarricade = new Boundary(-95, 143.75, 30, 80, world);
        this.rightBarricade = new Boundary(95, 143.75, 30, 80, world);
        this.bumpers = [
            new Bumper(0,-60,20, world),
            new Bumper(-50,10,10, world),
            new Bumper(0,60,10, world),
            new Bumper(50,10,10, world),
        ];
        this.leftBarricade.rotate(-65);
        this.rightBarricade.rotate(65);
    }

    show(p5: p5Type, ball:Ball) {
        for (let i = 0; i < this.bumpers.length; i++) {
            if (this.bumpers[i].update(ball)){this.score++;}
            this.bumpers[i].show(p5);
        }
        this.leftMain.show(p5);
        this.rightMain.show(p5);
        this.leftBarricade.show(p5);
        this.rightBarricade.show(p5);
        this.topMain.show(p5);
    }
}

export default PinballFrame;