import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Card } from "../models/card.model"
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CardService {
  constructor(private http: HttpClient) {
  }

  private cardsUrl = "http://localhost:8080/cards"

  findAll(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl)
  }

  findById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.cardsUrl}/${id}`)
  }

  update(id: number, student: Card): Observable<Card> {
    return this.http.post<Card>(`${this.cardsUrl}/${id}`, student)
  }

  create(card: Card): Observable<Card> {
    return this.http.post<Card>(this.cardsUrl, card)
  }

  delete(card : Card) {
    return this.http.delete(`${this.cardsUrl}/${card.id}`)
  }
}
