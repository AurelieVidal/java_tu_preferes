import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SliderService} from "../services/slider.service";
import { GameSettingsModel } from "../models/gameSettings.model";
import { GameSettingsService } from "../services/gameSettings.service";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slidervalue!: number
  gameSettings!: GameSettingsModel
  nbPlayers!: number
  sliderValue: number = 50; // La valeur par défaut du slider, ajustez selon vos besoins
  leftValue!: number;
  rightValue!: number;
  left!: string;
  right!: string;


  constructor(private sliderSerevice: SliderService,
              private gameSettingsService: GameSettingsService,) {
  }

  get audioPlayerRef(): ElementRef {
    return this._audioPlayerRef;
  }
  @ViewChild('audioPlayer', {static: false}) private _audioPlayerRef!: ElementRef;


  //initialisation
  ngOnInit() {
    this.gameSettings = this.gameSettingsService.getGameSettings();
    this.nbPlayers = this.gameSettings.nombreJoueur
    this.slidervalue = Math.round(this.sliderSerevice.getValue()*this.gameSettings.nombreJoueur/100)
    this.leftValue = parseInt(String(this.sliderValue / 100 * this.nbPlayers));
    this.rightValue = parseInt(String((100 - this.sliderValue)/100*this.nbPlayers));
    this.left = String(this.leftValue)+" joueurs"
    this.right = String(this.rightValue)+" joueurs"
    this.updateBeforeAfterWidth();
  }

  //Quand on change la valeur du slider
  onSliderChange() {
    const audioPlayer = this.audioPlayerRef.nativeElement as HTMLAudioElement;
    audioPlayer.play();
    this.slidervalue = Math.round(this.sliderSerevice.getValue()*this.gameSettings.nombreJoueur/100)
    this.sliderSerevice.setValue(this.sliderValue);

    //on retire le texte si l'espace est trop petit
    if (this.sliderValue>90){
      this.right = ""
    }
    else if ( this.sliderValue<10){
      this.left = ""
    }
    else {
      this.left = String(this.leftValue)+" joueurs"
      this.right = String(this.rightValue)+" joueurs"
    }

    this.updateBeforeAfterWidth();
  }

  //pour modifier la taille des divs du slider
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
