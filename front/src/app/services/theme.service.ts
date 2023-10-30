import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import {HttpClient} from "@angular/common/http";
import {Theme} from "../models/themes.model";
import {Card} from "../models/card.model";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  constructor(private http: HttpClient) {
  }

  private themeUrl = "http://localhost:8080/themes"

  findAll(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themeUrl)
  }

  findById(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.themeUrl}/${id}`)
  }


}
