import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {PlayerInfo} from "../models/player-info.model";
import {PlayerService} from "../services/player.service";
import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {ViewportScroller} from "@angular/common";


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
})
export class ScoresComponent implements OnInit{
  nombreJoueur!: number;
  users!: FormGroup;
  players: PlayerInfo[];
  showVainqueur: boolean = false;
  showLoader = true;
  displayedColumns: string[] = ['position', 'name', 'ecart'];
  dataSource!: MatTableDataSource<PlayerInfo>;
  gagnant!: PlayerInfo | undefined;



  constructor(private router: Router, private activatedRoute: ActivatedRoute, private playerService: PlayerService,) {
    this.users = new FormGroup({});
    this.players = this.playerService.getPlayers();
  }



ngOnInit(): void {
  this.viewportScroller.scrollToPosition([0, 0]);

  setTimeout(() => {
    this.showLoader = false;
    this.showVainqueur = true;
  }, 3000);

  this.calculateTotalEcart();
  this.sortPlayersByEcart();


  this.gagnant = this.players.find(player => player.position === 1);
  this.dataSource = new MatTableDataSource(this.players);

}

  getNumberArray(n: number): any[] {
    return Array(n);
  }

  onSubmit() {
    console.log("Valeurs du FormGroup (users):", this.users.value);
    console.log("nb de joueurs " + parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]));
    console.log(this.users.value);
  }

  calculateTotalEcart(): void {
    const numManches = this.players[0].predictions.length;

    for (let i = 0; i < numManches; i++) {
      console.log("MANCHE" + i)
      const option1Count = this.players.filter((p) => p.choices[i] === "option1").length;
      console.log(option1Count)
      //OK
      this.players.forEach((player) => {
        console.log("prediction")
        console.log(player.predictions[i])
        const ecart = Math.abs(player.predictions[i] - option1Count);
        player.totalEcart = (player.totalEcart || 0) + ecart;
        console.log("+ ECART"+player.totalEcart)
      });
    }
  }


  sortPlayersByEcart(): void {
    this.players.sort((a, b) => {
      const totalEcartA = a.totalEcart || -5;
      const totalEcartB = b.totalEcart || -5;

      return totalEcartA - totalEcartB;
    });


    // Ajoutez la position après le tri
    this.players.forEach((player, index) => {
      player.position = index + 1;
    });
  }



  versAccueil() {
    this.router.navigateByUrl("")
  }
}
