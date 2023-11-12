import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Component } from "@angular/core";
import { GameSettingsService } from "../services/gameSettings.service";
import {ThemeService} from "../services/theme.service";
import {Observable} from "rxjs";
import {ThemeModel} from "../models/themes.model";
import {NumberService} from "../services/number.service";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent {
  form: FormGroup; // Créez un formulaire réactif
  themes_obs!:Observable<ThemeModel[]>
  themes!: ThemeModel[]
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  //firstFormGroup = new FormGroup('');
  //secondFormGroup = new FormControl('');
  //thirdFormGroup = new FormControl('');

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private gameSettingsService: GameSettingsService,
              private themeService : ThemeService,
              private _formBuilder: FormBuilder,
              private numberService: NumberService
  ) {
    this.form = this.fb.group({
      nombreJoueur: ['', [Validators.required, Validators.min(2), Validators.max(10)]],
      nombreManche: [1, [Validators.required, Validators.min(1), Validators.max(10)]]

    });
    this.themes_obs = themeService.findAll();
  }

  onContinue(): void {
    // Enregistrez le nombre de manches dans le service GameSettingsService
    console.log(this.numberService.getValueJoueur())
    console.log(this.numberService.getValueManche())

    this.gameSettingsService.setGameSettings({
      nombreManche: this.numberService.getValueManche(), // Utilisez this.form.value
      nombreJoueur: this.numberService.getValueJoueur(), // Utilisez this.form.value
      currentManche: 1,
      currentPlayer: 0
    });
    console.log('menu/' + this.numberService.getValueJoueur() + '/' + this.numberService.getValueManche())
    this.router.navigateByUrl('menu/' + this.numberService.getValueJoueur() + '/' + this.numberService.getValueManche());
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value.nombreJoueur);
    } else {
      // Affichez un message d'erreur ou effectuez une action appropriée si les champs ne sont pas valides
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.form.patchValue({
        nombreManche: s["nombreManche"] // Initialisez le champ nombreManche à partir des paramètres
      });
      console.log("le nbr de manche est " + this.form.value.nombreManche);
    });

    this.themes_obs.subscribe(
      theme => this.themes = theme
    )
  }

  versThemes() {
    console.log("THEME")
    this.router.navigateByUrl('themes')
  }
}
