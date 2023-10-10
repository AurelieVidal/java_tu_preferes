import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartieComponent} from "./partie/partie.component";

const routes: Routes = [
  { path: 'partie', component: PartieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
