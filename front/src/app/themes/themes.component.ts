import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Liaison} from "../models/liaison.model";
import {LiaisonService} from "../services/liaison.service";
import {CardService} from "../services/card.services";
import {Router} from "@angular/router";
import {Theme} from "../models/themes.model";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  themes$: Observable<Theme[]>;
  theme!: Theme[];

  constructor(
    private themeService: ThemeService,
    private cardService: CardService,
    private router: Router
  ) {
    this.themes$ = themeService.findAll();
  }



  ngOnInit() {
    this.themes$.subscribe(
      x => {
        this.theme = x;
        console.log('Liaisons récupérées :', x);
/*
        // Récupérer les réponses des cartes pour chaque liaison
        for (const paire of this.liaison) {
          this.cardService.findById(Number(paire.id_1)).subscribe(
            carte1 => paire.carte1 = carte1
          );

          this.cardService.findById(Number(paire.id_2)).subscribe(
            carte2 => paire.carte2 = carte2
          );
        }*/
      }
    );
  }

  versAddTheme() {
    this.router.navigateByUrl("addTheme")
  }

  DeleteTheme(theme: Theme, index: number) {
    console.log("DELETE")
    this.theme.splice(index, 1);
    this.themeService.delete(theme).subscribe(//() =>
    //this.router.navigate(["students"])
    )
  }

}












