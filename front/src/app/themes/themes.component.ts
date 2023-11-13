import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {CardService} from "../services/card.services";
import {Router} from "@angular/router";
import {ThemeModel} from "../models/themes.model";
import {ThemeService} from "../services/theme.service";
import { Location } from '@angular/common';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {
  themes$: Observable<ThemeModel[]>;
  theme!: ThemeModel[];
  searchForm = new FormControl('')
  isSearching: boolean = false;
  dataSource = new MatTableDataSource<ThemeModel>();
  displayedColumns: string[] = ['name', 'number', 'actions'];

  constructor(
    private themeService: ThemeService,
    private cardService: CardService,
    private router: Router,
    private location: Location
  ) {
    this.themes$ = themeService.findAll();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator


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
    this.themes$.subscribe(
      x => {
        this.theme = x;
        console.log('Liaisons récupérées :', x);
        this.dataSource.data = x
      }
    );
    console.log(this.dataSource.data)
  }

  versAddTheme() {
    this.router.navigateByUrl("addTheme")
  }

  DeleteTheme(theme: ThemeModel) {
    console.log("SUPPR")
    this.themeService.delete(theme).subscribe()

    const index = this.dataSource.data.findIndex(c => c.id === theme.id);

    // Vérifiez si la carte a été trouvée dans dataSource
    if (index >= 0) {
      // Supprimez la carte de dataSource
      this.dataSource.data.splice(index, 1);
      // Rafraîchissez dataSource pour mettre à jour la vue
      this.dataSource._updateChangeSubscription();
    }
  }

  Recherche() {
    const searchTerm = String(this.searchForm.value); // Assurez-vous que searchForm.value contient le terme de recherche

    if (searchTerm==""){
      return;
    }

    this.themeService.search(searchTerm).subscribe(
      result => {
        this.dataSource.data = result
      }
    );

    console.log(this.dataSource.data)
    this.isSearching = true;
  }

  AnnulerRecherche() {
    this.isSearching = false
    this.themes$.subscribe(
      cards => this.dataSource.data = cards
    )
    this.searchForm.setValue("")

  }

  AfficherTheme(theme: ThemeModel) {
    this.router.navigateByUrl('cartes/'+theme.id)
  }

  ModifierTheme(theme: ThemeModel) {
    this.router.navigateByUrl('edit/'+theme.id)
  }
}













