import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartieComponent} from "./partie/partie.component";
import {MenuComponent} from "./menu/menu.component";
import {QuestionsComponent} from "./questions/questions.component";
import {PageAccueilComponent} from "./page-accueil/page-accueil.component";

const routes: Routes = [
  { path: 'partie', component: PartieComponent },
  { path: 'menu/:nbrJoueur', component: MenuComponent},
  { path: 'questions', component: QuestionsComponent},
  {path: '', component: PageAccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }