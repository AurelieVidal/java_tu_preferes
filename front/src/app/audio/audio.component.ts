import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements AfterViewInit {
  isPlaying!: boolean

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.playAudio(); // Appel de la fonction playAudio lorsqu'une vue a été initialisée
  }

  playAudio() {
    const audioPlayer = this.el.nativeElement.querySelector('audio'); // Sélectionne l'élément audio du DOM

    if (audioPlayer.paused) {
      this.isPlaying = true; // Met à jour l'état de lecture à true (en cours de lecture)
      audioPlayer.play(); // Démarre la lecture de l'audio
    } else {
      this.isPlaying = false; // Met à jour l'état de lecture à false (non en cours de lecture)
      audioPlayer.pause(); // Met en pause la lecture de l'audio
    }
  }
}







