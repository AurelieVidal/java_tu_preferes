import {Component, Input, OnInit, NgModule} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormArray} from '@angular/forms';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {PersoService} from "../services/perso.service";
import {Perso} from "../models/Perso";
import {Observable} from "rxjs";

/**
 * @title Input with error messages
 */


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, RouterOutlet, NgForOf, NgClass, AsyncPipe],

})

export class MenuComponent implements OnInit{
  nbrJoueur!:number;
  contactForm!: FormGroup;
  userForm = new FormGroup({
    pseudo: new FormControl(''),
  });
  usersPseudo!: FormGroup;

  pseudoUser!: string;
  listperso : Observable<Perso[]>
  persos!: Perso [];
  perso_choisi!: bigint;
  protected readonly Object = Object;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private persoService: PersoService){
    this.listperso =persoService.findAll();
  }


  counter() {
    return new Array(parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]))
  }

  onContinue(): void{
    this.router.navigateByUrl('questions');
  }

  onSubmitForm():void {
    console.log(this.pseudoUser);
    console.log("c'est réussi"+this.nbrJoueur);
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

  SelectImage(id: any): void {
    this.perso_choisi = id;
    console.log(id);
  }

  pseudoFormControl = new FormControl('', [Validators.required]);

  onSubmit() {
    console.warn(this.userForm.value);
    console.log("c'est réussi "+ parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]));
    console.log(this.usersPseudo.value)
  }

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.params.subscribe(s=>{
        this.nbrJoueur = s["nbrJoueur"]
      }
    )

    this.listperso.subscribe(
      x => {
        this.persos = x;
        console.log(x)
      }
    );

  }

  initForm() {
    const formControls: any = {};

    for (let i = 0; i < parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]); i++) {
      formControls[`pseudo_${i}`] = new FormControl('');
    }

    this.usersPseudo = new FormGroup(formControls);
  }
}



