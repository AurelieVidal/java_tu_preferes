import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Liaison} from "../models/liaison.model";
import {LiaisonService} from "../services/liaison.service";

@Component({
  selector: 'app-add-liaison',
  templateUrl: './add-liaison.component.html',
  styleUrls: ['./add-liaison.component.css']
})
export class AddLiaisonComponent {

  // Formulaire de liaison avec deux champs obligatoires (id_1 et id_2)
  liaisonForm = new FormGroup({
    id_1: new FormControl('', Validators.required),
    id_2: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private _route: ActivatedRoute, private liaisonService: LiaisonService) {
    this.liaisonService = liaisonService;
  }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit() {
    const liaison: Liaison = {
      id_1: Number(this.liaisonForm.controls.id_1.value!!),
      id_2: Number(this.liaisonForm.controls.id_2.value!!)
    };

    this.liaisonService.create(liaison).subscribe(() => {
      // Redirection vers la page des liaisons après la création
      this.router.navigate(["liaisons"])
    })
  }
}
