import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, Router} from "@angular/router";

/**
 * @title Basic buttons
 */
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],

})
export class QuestionsComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute){ }

  onContinue(): void{
    this.router.navigateByUrl('partie');
  }

}



