import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CardService} from "../services/card.services";
import {Card} from "../models/card.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit, AfterViewInit {
  cards$: Observable<Card[]>;
  myCarte!: Card[];
  dataSource = new MatTableDataSource<Card>();
  displayedColumns: string[] = ['#', 'content', 'actions'];
  searchForm = new FormControl('')
  cardForm = new FormGroup({
    reponse: new FormControl('', Validators.required)
  })
  isSearching: boolean = false;
  isEditing: boolean[] = [];
  editedCardValue: string = '';

  // Constructeur de la classe avec injection de dépendances
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private cardService: CardService,
    private snackBar: MatSnackBar,
    private location: Location,
    private dialog: MatDialog
  ) {
    // Initialisation de l'observable cards$
    this.cards$ = cardService.findAll()
  }

  // Cette fonction est appelée après que View a été initialisée.
  ngAfterViewInit() {
    // Initialise le paginator pour la source de données et personnalise les étiquettes du paginator.
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

  // Cette fonction est appelée lors de l'initialisation du composant.
  ngOnInit() {
    // Abonnennement à l'observable cards$ pour obtenir les données de la carte.
    this.cards$.subscribe(
      cards => {
        // Met à jour les données de la carte et de la source de données.
        this.myCarte = cards
        this.dataSource.data = cards
      }
    )
  }

  // Affichage un message d'erreur
  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000, // Durée d'affichage du toast en millisecondes
    });
  }

  // Cette fonction est appelée lors de la soumission du formulaire pour ajouter une nouvelle carte.
  async onSubmit() {
    if (String(this.cardForm.controls.reponse.value!!) == "") {
      this.showErrorMessage("Veuillez renseigner une valeur");
      return;
    }

    // Vérifie si la carte existe déjà.
    const reponse = await this.cardService.exist(this.cardForm.controls.reponse.value!!).toPromise();

    if (reponse) {
      this.showErrorMessage("Cette carte existe déjà !");
      return;
    }

    // Crée une nouvelle carte et la sauvegarde.
    const card: Card = {reponse: this.cardForm.controls.reponse.value!!};
    const createdCard = await this.cardService.create(card).toPromise();

    // Redirige et recharge la page.
    this.router.navigateByUrl("addCard");
    window.location.reload();
  }

  // Effectue une recherche en fonction du terme saisi.
  Recherche() {
    const searchTerm = String(this.searchForm.value);
    if (searchTerm == "") {
      return;
    }

    this.cardService.search(searchTerm).subscribe(
      result => {
        this.dataSource.data = result
      }
    );
    this.isSearching = true;
  }

  // Annule la recherche en cours et réinitialise les données de la carte.
  AnnulerRecherche() {
    this.isSearching = false
    this.cards$.subscribe(
      cards => this.dataSource.data = cards
    )
    this.searchForm.setValue("")
  }

  // Supprime une carte et met à jour la source de données.
  delete(card: Card) {
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

  // Vérifie si une carte est actuellement en cours d'édition.
  isEditingCard(card: Card): boolean {
    return this.isEditing[Number(card.id)] || false;
  }

  // Enregistre la valeur éditée pour une carte.
  saveEditedCard(card: Card) {
    card.reponse = this.editedCardValue;
    this.cardService.update(Number(card.id), card).subscribe()
    this.cards$ = this.cardService.findAll()
    this.isEditing[Number(card.id)] = false;
  }

  // Cette fonction active ou désactive le mode d'édition pour une carte spécifiée.
  edit(card: Card) {
    //this.isEditing = true
    this.isEditing[Number(card.id)] = !this.isEditingCard(card);
    if (this.isEditingCard(card)) {
      this.editedCardValue = card.reponse;
    }
  }

  // Cette fonction utilise le service Angular Location pour revenir en arrière dans la navigation.
  Retour() {
    this.location.back();
  }

  // Cette fonction affiche une boîte de dialogue de confirmation avant de supprimer une carte.
  confirmer(card: Card) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Etes-vous sûr de vouloir supprimer cette carte ? Toutes les questions contenant cette carte seront supprimées. Si toutes les questions d'un thème ont été supprimées, ce thème sera supprimé automatiquement."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(card);
      }
    });
  }
}
