import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartieComponent} from "./partie/partie.component";
import {MenuComponent} from "./menu/menu.component";
import {QuestionsComponent} from "./questions/questions.component";
import {PageAccueilComponent} from "./page-accueil/page-accueil.component";
import { GestionCartesComponent } from './gestion-cartes/gestion-cartes.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddLiaisonComponent } from './add-liaison/add-liaison.component';
import {ConfigComponent} from "./config/config.component";
import { ThemesComponent } from './themes/themes.component';
import {ScoresComponent} from "./scores/scores.component";
//import {ScoresComponent} from "./scores/scores.component";
import { EditThemeComponent } from './edit-theme/edit-theme.component';

const routes: Routes = [
  { path: 'partie', component: PartieComponent },
  { path: 'menu/:nbrJoueur', component: MenuComponent},
  { path: 'menu/:nbrJoueur/:nbManche', component: MenuComponent},
  { path: 'questions', component: QuestionsComponent},
  { path: 'cartes/:id', component: GestionCartesComponent},
  {path: 'addCard', component: AddCardComponent},
  {path: '', component: PageAccueilComponent},
  {path: 'accueil/:nombreManche', component: PageAccueilComponent},
  {path: 'addLiaison', component: AddLiaisonComponent},
  { path: 'liaisons', component: AddLiaisonComponent },
  {path: 'config', component: ConfigComponent},
  //{path: 'score/:nbrJoueur', component: ScoresComponent},
  { path: 'themes', component: ThemesComponent},
  {path: 'edit/:id', component: EditThemeComponent},
  {path: 'score/:nbrJoueur', component: ScoresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
