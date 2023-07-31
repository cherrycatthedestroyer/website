import p5Type from "p5";
import "p5/lib/addons/p5.sound";


class MusicPlayer {
    songs: p5Type.SoundFile[];
    ambient: p5Type.SoundFile[];
    isPlaying: boolean;
    currentSong: number;
    sensor:p5Type.FFT;

    constructor(p5:p5Type) {
        this.songs = [new window.p5.SoundFile("assets/smile[mix10].wav"),new window.p5.SoundFile("assets/smile[mix10].wav"),
        new window.p5.SoundFile("assets/loluv.mp3"), new window.p5.SoundFile("assets/blackflume.wav")];
        this.ambient = [new window.p5.SoundFile("assets/interior.mp3"),new window.p5.SoundFile("assets/select.wav"), 
                        new window.p5.SoundFile("assets/move1.mp3"), new window.p5.SoundFile("assets/ballLost.wav"),
                        new window.p5.SoundFile("assets/tap.wav"), new window.p5.SoundFile("assets/eject.mp3"),
                        new window.p5.SoundFile("assets/humOn.mp3")];
        this.isPlaying = false;
        this.currentSong=0;
        this.sensor = new window.p5.FFT(0.8, 16);
    }

    play(index:number):boolean{
        if (index!=0){
            if (index==this.currentSong){
                this.songs[this.currentSong].pause();
                this.isPlaying=false;
                this.currentSong=0;
                return false;
            }
            this.songs[this.currentSong].pause();
            this.songs[index].play();
            this.isPlaying=true;
            this.currentSong=index;
            this.sensor.setInput(this.songs[index]);
            return true;
        }
        return false;
    }

    pause(){
        
    }

    show(p5: p5Type) {
        if (this.isPlaying){
            p5.push();
            p5.translate(-40,85);
            p5.scale(0.2,-0.2);
            p5.fill(245,212,125,80);
            p5.noStroke();
            let spectrum = this.sensor.analyze();
            let index = 0;
            let barWidth = 20;
            while (index < spectrum.length) {
                p5.rect(index * barWidth, 0, barWidth*1.8, spectrum[index]*0.6);
                index++;
            }
            p5.pop();
        }
    }
}

export default MusicPlayer;