import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormArray} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


/**
 * @title Input with error messages
 */

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, RouterOutlet, NgForOf],
})

export class MenuComponent implements OnInit{
  nbrJoueur!:number;
  contactForm!: FormGroup;
  userForm = new FormGroup({
    pseudo: new FormControl(''),
  });
  usersPseudo!: FormGroup;

constructor(private router: Router, private activatedRoute: ActivatedRoute) {
}

  counter() {
  return new Array(parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]))
  }
  onContinue(): void{
  this.router.navigateByUrl('questions');
  }

  pseudoFormControl = new FormControl('', [Validators.required]);

  onSubmit() {
    console.warn(this.userForm.value);
    console.log("c'est réussi "+ parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]));
    console.log(this.usersPseudo.value)
  }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    const formControls: any = {};

    for (let i = 0; i < parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]); i++) {
      formControls[`pseudo_${i}`] = new FormControl('');
    }

    this.usersPseudo = new FormGroup(formControls);
  }

  protected readonly Array = Array;
  protected readonly Object = Object;
}

