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
    ScoresComponent,
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
    MatButtonModule
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
