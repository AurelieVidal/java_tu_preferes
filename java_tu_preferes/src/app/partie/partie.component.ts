import {Component, Input, OnInit} from '@angular/core';
import {carte} from "../models/carte";
import {joueur} from "../models/joueur";


@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css']
})
export class PartieComponent implements OnInit{
  myCarte!: carte[];
  joueur1!: joueur;
  joueur2 !: joueur;
  joueur1Score!: number;
  joueur2Score!: number;
  ngOnInit(){
    this.joueur1Score=0;
    this.joueur2Score=0;
    this.joueur1 = new joueur('Dwight','https://screenrant.com/wp-content/uploads/2018/10/Dwight-Schrute-in-a-Meredith-Wig.jpg');
    this.joueur2 = new joueur('Mickeal','https://images4.fanpop.com/image/photos/17700000/Michael-the-office-17734797-400-600.jpg');
    this.myCarte =[
      new carte(
      'chocolatine'
    ),
      new carte(
      'pain au chocolat'
    ),
    new carte(
      'le Z'
    )];
  }

}
