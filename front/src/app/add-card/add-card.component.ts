import { Component } from '@angular/core';
import { CardService } from "../services/card.services";
import { Card } from "../models/card.model";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent {
  cards$: Observable<Card[]>;
  myCarte!: Card[];

  cardForm = new FormGroup({
    reponse : new FormControl('', Validators.required)
  })


  constructor(private router: Router, private _route: ActivatedRoute, private cardService: CardService) {
    this.cardService = cardService;
    this.cards$ = cardService.findAll()
  }

  onSubmit() {
    const card : Card = {reponse: this.cardForm.controls.reponse.value!!}
    console.log(card.reponse)
    this.cardService.create(card).subscribe(() => {
      this.router.navigate(["cards"])
    })



  }
}
