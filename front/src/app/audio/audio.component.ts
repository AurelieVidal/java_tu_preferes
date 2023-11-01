import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
    /*`
    <audio (play)="onPlay()" (pause)="onPause()" (loadedmetadata)="onLoadedMetadata()" (ended)="onEnded()">
      <source src="assets/audio_the_office.mp3" type="audio/mp3">
      Your browser does not support the audio element.
    </audio>
  `,*/
  styleUrls: ['./audio.component.css']
})
export class AudioComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit() {
    const audioPlayer = this.el.nativeElement.querySelector('audio');
    this.renderer.listen(audioPlayer, 'play', (event) => {
      this.onPlay();
    });
  }

  onPlay() {
    console.log('Lecture en cours');
    // Ajouter ici votre logique spécifique à l'action de lecture
  }

  playAudio() {
    const audioPlayer = this.el.nativeElement.querySelector('audio');
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }
}







