import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SliderService} from "../services/slider.service";
import {Subscription} from "rxjs";
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

  set audioPlayerRef(value: ElementRef) {
    this._audioPlayerRef = value;
  }
  @ViewChild('audioPlayer', {static: false}) private _audioPlayerRef!: ElementRef;



  ngOnInit() {
    this.gameSettings = this.gameSettingsService.getGameSettings();
    this.nbPlayers = this.gameSettings.nombreJoueur
    this.slidervalue = Math.round(this.sliderSerevice.getValue()*this.gameSettings.nombreJoueur/100)
    this.leftValue = parseInt(String(this.sliderValue / 100 * this.nbPlayers));
    this.rightValue = parseInt(String((100 - this.sliderValue)/100*this.nbPlayers));
    this.left = String(this.leftValue)+" joueurs"
    this.right = String(this.rightValue)+" joueurs"
    console.log('Valeur actuelle du slider :', this.sliderValue);
    this.updateBeforeAfterWidth();
  }

  onSliderChange() {
    const audioPlayer = this.audioPlayerRef.nativeElement as HTMLAudioElement;
    audioPlayer.play();
    const value = (this.sliderValue - 1) / 99;
    this.slidervalue = Math.round(this.sliderSerevice.getValue()*this.gameSettings.nombreJoueur/100)
    console.log('Valeur actuelle du slider :', this.sliderValue);
    this.sliderSerevice.setValue(this.sliderValue);


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
