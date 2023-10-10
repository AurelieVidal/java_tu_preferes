import {Component, Input, OnInit} from '@angular/core';
import {carte} from "../models/carte";


@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css']
})
export class PartieComponent implements OnInit{
  myCarte!: carte[];
  ngOnInit(){
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
