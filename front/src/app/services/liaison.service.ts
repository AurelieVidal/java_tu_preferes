import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import {HttpClient} from "@angular/common/http";
import {Liaison} from "../models/liaison.model";
import {Card} from "../models/card.model";

@Injectable({
  providedIn: "root",
})
export class LiaisonService {
  constructor(private http: HttpClient) {
  }

  private liaisonUrl = "http://localhost:8080/liaisons"

  findAll(): Observable<Liaison[]> {
    return this.http.get<Liaison[]>(this.liaisonUrl)
  }

  create(liaison : Liaison): Observable<Liaison> {
    return this.http.post<Liaison>(this.liaisonUrl, liaison)
  }

  update(id: number, liaison: Liaison): Observable<Liaison> {
    return this.http.post<Liaison>(`${this.liaisonUrl}/${id}`, liaison)
  }

}
