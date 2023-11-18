import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements AfterViewInit{
  isPlaying!: boolean
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit() {
    /*
    const audioPlayer = this.el.nativeElement.querySelector('audio');
    this.renderer.listen(audioPlayer, 'play', (event) => {
      this.onPlay();
    });*/
    this.playAudio()
  }

  onPlay() {
    console.log('Lectures en cours');
    // Ajouter ici votre logique spécifique à l'action de lecture
  }

  playAudio() {
    const audioPlayer = this.el.nativeElement.querySelector('audio');
    if (audioPlayer.paused) {
      this.isPlaying = true
      audioPlayer.play();
    } else {
      this.isPlaying = false
      audioPlayer.pause();
    }
  }
}







