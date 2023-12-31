import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {QuestionsComponent} from "./questions/questions.component";
import {PageAccueilComponent} from "./page-accueil/page-accueil.component";
import {GestionCartesComponent} from './gestion-cartes/gestion-cartes.component';
import {AddCardComponent} from './add-card/add-card.component';
import {AddLiaisonComponent} from './add-liaison/add-liaison.component';
import {ConfigComponent} from "./config/config.component";
import {ThemesComponent} from './themes/themes.component';
import {ScoresComponent} from "./scores/scores.component";
import {GameComponent} from "./game/game.component";
import {EditThemeComponent} from './edit-theme/edit-theme.component';
import {AddThemeComponent} from './add-theme/add-theme.component';

const routes: Routes = [
  {path: 'menu/:nbrJoueur/:nbManche', component: MenuComponent},
  {path: 'menu/:nbrJoueur/:nbManche/:idTheme', component: MenuComponent},
  {path: 'questions', component: QuestionsComponent},
  {path: 'cartes', component: GestionCartesComponent},
  {path: 'cartes/:id', component: GestionCartesComponent},
  {path: 'addCard', component: AddCardComponent},
  {path: '', component: PageAccueilComponent},
  {path: 'accueil/:nombreManche', component: PageAccueilComponent},
  {path: 'addLiaison', component: AddLiaisonComponent},
  {path: 'liaisons', component: AddLiaisonComponent},
  {path: 'config', component: ConfigComponent},
  //{path: 'score/:nbrJoueur', component: ScoresComponent},
  {path: 'edit/:id', component: EditThemeComponent},
  {path: 'score/:nbrJoueur', component: ScoresComponent},
  {path: 'scores', component: ScoresComponent},
  {path: 'themes', component: ThemesComponent},
  {path: 'game', component: GameComponent},
  {path: 'game/:themeId', component: GameComponent},
  {path: 'addTheme', component: AddThemeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
