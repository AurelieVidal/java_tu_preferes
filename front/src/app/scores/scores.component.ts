import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerInfo} from "../models/player-info.model";
import {PlayerService} from "../services/player.service";
import {MatTableDataSource} from "@angular/material/table";
import {ViewportScroller} from "@angular/common";


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
})
export class ScoresComponent implements OnInit{
  nombreJoueur!: number;
  players: PlayerInfo[];
  showVainqueur: boolean = false;
  showLoader = true;
  displayedColumns: string[] = ['position', 'name', 'ecart'];
  dataSource!: MatTableDataSource<PlayerInfo>;
  gagnant!: PlayerInfo | undefined;



  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private playerService: PlayerService,
              private viewportScroller: ViewportScroller,) {
    this.players = this.playerService.getPlayers();
  }



ngOnInit(): void {
  this.viewportScroller.scrollToPosition([0, 0]);

  setTimeout(() => {
    this.showLoader = false;
    this.showVainqueur = true;
  }, 3000);

  //calcul des scores et tri des joueurs
  this.calculateTotalEcart();
  this.sortPlayersByEcart();


  this.gagnant = this.players.find(player => player.position === 1);
  this.dataSource = new MatTableDataSource(this.players);

}

  calculateTotalEcart(): void {
    const numManches = this.players[0].predictions.length;

    for (let i = 0; i < numManches; i++) {
      const option1Count = this.players.filter((p) => p.choices[i] === "option1").length;
      this.players.forEach((player) => {
        const ecart = Math.abs(player.predictions[i] - option1Count);
        player.totalEcart = (player.totalEcart || 0) + ecart;
      });
    }
  }


  sortPlayersByEcart(): void {
    this.players.sort((a, b) => {
      const totalEcartA = a.totalEcart || -5;
      const totalEcartB = b.totalEcart || -5;
      return totalEcartA - totalEcartB;
    });

    this.players.forEach((player, index) => {
      player.position = index + 1;
    });
  }


  versAccueil() {
    this.router.navigateByUrl("")
  }
}
