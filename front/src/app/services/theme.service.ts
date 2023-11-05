import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import {HttpClient} from "@angular/common/http";
import {ThemeModel} from "../models/themes.model";
import {Card} from "../models/card.model";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  constructor(private http: HttpClient) {
  }

  private themeUrl = "http://localhost:8080/themes"

  findAll(): Observable<ThemeModel[]> {
    return this.http.get<ThemeModel[]>(this.themeUrl)
  }

  findById(id: number): Observable<ThemeModel> {
    return this.http.get<ThemeModel>(`${this.themeUrl}/${id}`)
  }
}
