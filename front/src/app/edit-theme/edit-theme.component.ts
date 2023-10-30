import {Component, OnInit} from '@angular/core';
import {Liaison} from "../models/liaison.model";
import {Observable} from "rxjs";
import {Theme} from "../models/themes.model";
import {CardService} from "../services/card.services";
import {ActivatedRoute, Router} from "@angular/router";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.css']
})
export class EditThemeComponent implements OnInit{
  liaison!: Liaison[];
  theme_obs!: Observable<Theme>
  theme!: Theme
  theme_id!:number

  constructor(
    private cardService: CardService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService
  ) {
    this.theme_id = parseInt(this.activatedRoute.snapshot.params["id"]);
    this.theme_obs = this.themeService.findById(this.theme_id);


  }

  ngOnInit() {

    this.theme_obs.subscribe (
      x=> {
        this.theme = x;
        console.log(this.theme)
        this.liaison = this.theme.paires
        for (const paire of this.liaison) {
          this.cardService.findById(Number(paire.id_1)).subscribe(
            carte1 => paire.carte1 = carte1
          );

          this.cardService.findById(Number(paire.id_2)).subscribe(
            carte2 => paire.carte2 = carte2
          );
        }
      }
    )



  }

  versAddCard(): void{
    this.router.navigateByUrl('addCard');
  }

  versAddLiaison(): void{
    this.router.navigateByUrl('addLiaison');
  }




}
