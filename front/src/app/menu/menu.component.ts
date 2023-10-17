import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormArray} from '@angular/forms';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {PersoService} from "../services/perso.service";
import {Perso} from "../models/Perso";
import {Observable} from "rxjs";
import {
  CarouselComponent, CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from "@coreui/angular";

/**
 * @title Input with error messages
 */


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf, RouterOutlet, NgForOf, NgClass, AsyncPipe, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, CarouselControlComponent, RouterLink],

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
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private persoService: PersoService){
    this.listperso =persoService.findAll();
  }

  onSubmitForm():void {
    console.log(this.pseudoUser);
    console.log("c'est réussi"+this.nbrJoueur);
  }

  counter() {
    return new Array(parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]))
  }

  onContinue(): void{
    this.router.navigateByUrl('questions');
  }

  SelectImage(id: any): void {
    this.perso_choisi = id;
    console.log(id);
  }

  pseudoFormControl = new FormControl('', [Validators.required]);

  onSubmit() {
    console.log(this.usersPseudo);
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

    this.slides = [];

    for (let i = 1; i <= 15; i++) {
      this.slides[i - 1] = {
        src: `./assets/images/${i}.jfif`,
      };
    }

  }

  initForm() {
    const formControls: any = {};

    for (let i = 0; i < parseInt(this.activatedRoute.snapshot.params["nbrJoueur"]); i++) {
      formControls[`pseudo_${i}`] = new FormControl('');
    }

    this.usersPseudo = new FormGroup(formControls);
  }
}



