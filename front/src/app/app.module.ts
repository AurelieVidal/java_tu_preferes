import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartieComponent } from './partie/partie.component';
import { MenuComponent } from './menu/menu.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { QuestionsComponent } from './questions/questions.component';

import {CardService} from "./services/card.services";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PartieComponent,
    MenuComponent,
    PageAccueilComponent,
    // QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
