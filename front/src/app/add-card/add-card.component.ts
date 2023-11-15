import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { CardService } from "../services/card.services";
import { Card } from "../models/card.model";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit, AfterViewInit{
  cards$: Observable<Card[]>;
  myCarte!: Card[];
  dataSource = new MatTableDataSource<Card>();
  displayedColumns: string[] = ['#', 'content', 'actions'];
  searchForm = new FormControl('')
  cardForm = new FormGroup({
    reponse : new FormControl('', Validators.required)
  })
  isSearching: boolean = false;
  isEditing: boolean[] = [];
  editedCardValue: string = '';


  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private cardService: CardService,
    private snackBar: MatSnackBar,
    private location: Location,
    private dialog: MatDialog) {

    this.cards$ = cardService.findAll()


  }

  @ViewChild(MatPaginator) paginator!: MatPaginator




  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator._intl.itemsPerPageLabel = 'Nombre de cartes par page';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.firstPageLabel = 'Première page'
    this.paginator._intl.lastPageLabel = 'Dernière page'
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
      }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };

  }

  ngOnInit() {
    console.log(this.cards$)
    this.cards$.subscribe(
      cards => {
        console.log("CARTES")
        console.log(cards)
        this.myCarte = cards
        this.dataSource.data = cards
        //for (let card of cards){this.isEditing.push(false)}
      }
    )

    console.log(this.dataSource.data)
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000, // Durée d'affichage du toast en millisecondes
    });
  }

  async onSubmit() {
    if (String(this.cardForm.controls.reponse.value!!) == "") {
      this.showErrorMessage("Veuillez renseigner une valeur");
      return;
    }

    const reponse = await this.cardService.exist(this.cardForm.controls.reponse.value!!).toPromise();

    if (reponse) {
      this.showErrorMessage("Cette carte existe déjà !");
      return;
    }

    const card: Card = { reponse: this.cardForm.controls.reponse.value!! };
    console.log(card.reponse);
    const createdCard = await this.cardService.create(card).toPromise();

    console.log('Carte créée :', createdCard);
    this.router.navigateByUrl("addCard");
    window.location.reload();
  }


  Recherche() {
    const searchTerm = String(this.searchForm.value); // Assurez-vous que searchForm.value contient le terme de recherche

    if (searchTerm==""){
      return;
    }

    this.cardService.search(searchTerm).subscribe(
      result => {
        this.dataSource.data = result
      }
    );

    console.log(this.dataSource.data)
    this.isSearching = true;
  }

  AnnulerRecherche() {
    this.isSearching = false
    this.cards$.subscribe(
      cards => this.dataSource.data = cards
    )
    this.searchForm.setValue("")
  }

  delete(card: Card) {
    console.log("SUPPR")
    this.cardService.delete(card).subscribe()

    const index = this.dataSource.data.findIndex(c => c.id === card.id);

    // Vérifiez si la carte a été trouvée dans dataSource
    if (index >= 0) {
      // Supprimez la carte de dataSource
      this.dataSource.data.splice(index, 1);
      // Rafraîchissez dataSource pour mettre à jour la vue
      this.dataSource._updateChangeSubscription();
    }
  }

  isEditingCard(card: Card): boolean {
    return this.isEditing[Number(card.id)] || false;
  }


  saveEditedCard(card: Card) {
    card.reponse = this.editedCardValue;
    // Envoyez la mise à jour au backend, par exemple :
    // this.cardService.update(card).subscribe(...)
    this.cardService.update(Number (card.id), card).subscribe()
    this.cards$ = this.cardService.findAll()
    this.isEditing[Number(card.id)] = false;
  }



  edit(card : Card) {
    //this.isEditing = true
    this.isEditing[Number(card.id)] = !this.isEditingCard(card);
    if (this.isEditingCard(card)) {
      this.editedCardValue = card.reponse;
    }
  }

  Retour() {
    this.location.back();
  }
/*
  confirmer (card : Card) {
    const snackBarRef = this.snackBar.open(
      "Etes-vous sûr de vouloir supprimer cette carte ? Toutes les liaisons la contenant seront également supprimées.",
      "Confirmer",
      { duration: 10000 }
    );

    // Ajouter un écouteur pour l'action "Confirmer" sur snackBarRef
    snackBarRef.onAction().subscribe(() => {
      console.log("OUI")
      this.delete(card)
    });
  }*/
  confirmer(card: Card) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Etes-vous sûr de vouloir supprimer cette carte ? Toutes les questions contenant cette carte seront supprimées. Si toutes les questions d'un thème ont été supprimées, ce thème sera supprimé automatiquement."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("OUI");
        this.delete(card);
      }
    });
  }

}
