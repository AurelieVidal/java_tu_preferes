import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Card} from "../models/card.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CardService} from "../services/card.services";
import {Liaison} from "../models/liaison.model";
import {LiaisonService} from "../services/liaison.service";

@Component({
  selector: 'app-add-liaison',
  templateUrl: './add-liaison.component.html',
  styleUrls: ['./add-liaison.component.css']
})
export class AddLiaisonComponent {
  //cards$: Observable<Card[]>;
  myCarte!: Card[];

  liaisonForm = new FormGroup({
    id_1 : new FormControl('', Validators.required),
    id_2 : new FormControl('', Validators.required)
  })


  constructor(private router: Router, private _route: ActivatedRoute, private liaisonService: LiaisonService) {
    this.liaisonService = liaisonService;
    //this.cards$ = cardService.findAll()
  }

  onSubmit() {
    const liaison : Liaison = {id_1: Number(this.liaisonForm.controls.id_1.value!!), id_2: Number(this.liaisonForm.controls.id_2.value!!)}
    console.log(liaison.id_1)
    console.log(liaison.id_2)

    this.liaisonService.create(liaison).subscribe(() => {
      this.router.navigate(["liaisons"])
    })



  }

}
