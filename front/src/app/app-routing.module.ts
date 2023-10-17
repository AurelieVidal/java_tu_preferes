import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartieComponent} from "./partie/partie.component";
import {MenuComponent} from "./menu/menu.component";
import {QuestionsComponent} from "./questions/questions.component";
import {PageAccueilComponent} from "./page-accueil/page-accueil.component";
import { GestionCartesComponent } from './gestion-cartes/gestion-cartes.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddLiaisonComponent } from './add-liaison/add-liaison.component';

const routes: Routes = [
  { path: 'partie', component: PartieComponent },
  { path: 'menu/:nbrJoueur', component: MenuComponent},
  { path: 'questions', component: QuestionsComponent},
  { path: 'cartes', component: GestionCartesComponent},
  {path: 'addCard', component: AddCardComponent},
  {path: '', component: PageAccueilComponent},
  {path: 'addLiaison', component: AddLiaisonComponent},
  { path: 'liaisons', component: AddLiaisonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
