import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SliderService} from "../services/slider.service";


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  sliderValue: number = 50;

  constructor(private sliderSerevice: SliderService) {
  }

  @ViewChild('audioPlayer', {static: false}) private _audioPlayerRef!: ElementRef;

  get audioPlayerRef(): ElementRef {
    return this._audioPlayerRef;
  }

  set audioPlayerRef(value: ElementRef) {
    this._audioPlayerRef = value;
  }

  ngOnInit() {
    console.log('Valeur actuelle du slider :', this.sliderValue);
    this.updateBeforeAfterWidth();
  }

  onSliderChange() {
    const audioPlayer = this.audioPlayerRef.nativeElement as HTMLAudioElement;
    audioPlayer.play();
    const value = (this.sliderValue - 1) / 99;
    //console.log('Valeur actuelle du slider :', this.sliderValue);
    this.sliderSerevice.setValue(this.sliderValue);
    this.updateBeforeAfterWidth();
  }

  private updateBeforeAfterWidth() {
    const value = (this.sliderValue - 1) / 99;
    const beforeWidth = value * 100;
    const afterWidth = (1 - value) * 100;

    const beforeElement = document.querySelector('.before') as HTMLElement;
    const afterElement = document.querySelector('.after') as HTMLElement;

    if (beforeElement && afterElement) {
      beforeElement.style.width = beforeWidth + '%';
      afterElement.style.width = afterWidth + '%';
    }
  }
}
