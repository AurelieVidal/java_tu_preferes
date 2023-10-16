import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Card } from "../models/card.model"
import {HttpClient} from "@angular/common/http";
import {Perso} from "../models/Perso";

@Injectable({
  providedIn: "root",
})
export class PersoService {
  constructor(private http: HttpClient) {
  }

  private persoUrl = "http://localhost:8080/persos"

  findAll(): Observable<Perso[]> {
    return this.http.get<Perso[]>(this.persoUrl)
  }


}
