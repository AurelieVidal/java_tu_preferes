import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Component} from "@angular/core";
import {GameSettingsService} from "../services/gameSettings.service";
import {ThemeService} from "../services/theme.service";
import {Observable} from "rxjs";
import {ThemeModel} from "../models/themes.model";
import {NumberService} from "../services/number.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent {
  form: FormGroup; // Créez un formulaire réactif
  themes_obs!: Observable<ThemeModel[]>
  themes!: ThemeModel[]
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  totalThemes!: ThemeModel[]


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private gameSettingsService: GameSettingsService,
              private themeService: ThemeService,
              private _formBuilder: FormBuilder,
              private numberService: NumberService,
              private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombreJoueur: ['', [Validators.required, Validators.min(2), Validators.max(10)]],
      nombreManche: [1, [Validators.required, Validators.min(1), Validators.max(10)]]

    });
    this.themes_obs = themeService.findAll();
  }

  getTheme(name: String) {
    for (let theme of this.themes) {
      if (theme.name == name) {
        return theme.id
      }
    }
    return -1
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000, // Durée d'affichage du toast en millisecondes
    });
  }

  onContinue(): void {
    // Enregistre le nombre de manches dans le service GameSettingsService
    if (this.getTheme(String(this.secondFormGroup.controls.secondCtrl.value)) == -1) {
      this.showErrorMessage("Veuillez renseigner un thème !")
      return;
    }

    this.gameSettingsService.setGameSettings({
      nombreManche: this.numberService.getValueManche(),
      nombreJoueur: this.numberService.getValueJoueur(),
      currentManche: 1,
      currentPlayer: 0,

    });
    this.router.navigateByUrl('menu/' + this.numberService.getValueJoueur() + '/' + this.numberService.getValueManche() + "/" + this.getTheme(String(this.secondFormGroup.controls.secondCtrl.value)));
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(s => {
      this.form.patchValue({
        nombreManche: s["nombreManche"] // Initialise le champ nombreManche à partir des paramètres
      });
    });

    this.themes_obs.subscribe(
      theme => {
        this.themes = theme
        this.totalThemes = theme
      }
    )
  }

  versThemes() {
    this.router.navigateByUrl('themes')
  }

  changed() {
    this.themes = this.totalThemes.filter((theme) => theme.paires.length >= this.numberService.getValueManche());
  }

}
