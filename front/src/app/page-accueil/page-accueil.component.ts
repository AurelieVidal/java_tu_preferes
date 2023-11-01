import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Component } from "@angular/core";
import { GameSettingsService } from "../services/gameSettings.service";

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent {
  form: FormGroup; // Créez un formulaire réactif

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private gameSettingsService: GameSettingsService
  ) {
    this.form = this.fb.group({
      nombreJoueur: ['', [Validators.required, Validators.min(2), Validators.max(10)]],
      nombreManche: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onContinue(): void {
    // Enregistrez le nombre de manches dans le service GameSettingsService
    this.gameSettingsService.setGameSettings({
      nombreManche: this.form.value.nombreManche, // Utilisez this.form.value
      nombreJoueur: this.form.value.nombreJoueur // Utilisez this.form.value
    });
    this.router.navigateByUrl('menu/' + this.form.value.nombreJoueur + '/' + this.form.value.nombreManche);
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
  }
}
