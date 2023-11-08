import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartieComponent } from './partie/partie.component';
import { MenuComponent } from './menu/menu.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { QuestionsComponent } from './questions/questions.component';

import { CardService } from "./services/card.services";
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CarouselComponent, CarouselControlComponent, CarouselInnerComponent, CarouselItemComponent } from "@coreui/angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import { GestionCartesComponent } from './gestion-cartes/gestion-cartes.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddLiaisonComponent } from './add-liaison/add-liaison.component';
import { ScoresComponent } from './scores/scores.component';

import { SliderComponent } from './slider/slider.component';

import { ConfigComponent } from './config/config.component';
import { ThemesComponent } from './themes/themes.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { EditThemeComponent } from './edit-theme/edit-theme.component';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { GameComponent } from './game/game.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddThemeComponent } from './add-theme/add-theme.component';
import { AudioComponent } from './audio/audio.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import { NumberInputComponent } from './number-input/number-input.component';
import { NumberService } from './services/number.service';

@NgModule({
  declarations: [
    AppComponent,
    PartieComponent,
    // MenuComponent,
    PageAccueilComponent,
    GestionCartesComponent,
    AddCardComponent,
    AddLiaisonComponent,
    SliderComponent,
    ConfigComponent,
    ThemesComponent,
    EditThemeComponent,
    ScoresComponent,
    GameComponent,
    AddThemeComponent,
    AudioComponent,
    NumberInputComponent,
    // QuestionsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatStepperModule,
  ],
  providers: [CardService,
              NumberService,
              ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
