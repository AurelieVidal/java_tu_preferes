import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {Card} from "../models/card.model"
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CardService {
  private cardsUrl = "http://localhost:8080/cards"

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsUrl)
  }

  findById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.cardsUrl}/${id}`)
  }

  update(id: number, card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.cardsUrl}/${id}`, card)
  }

  create(card: Card): Observable<Card> {
    return this.http.post<Card>(this.cardsUrl, card)
  }

  delete(card: Card) {
    return this.http.delete(`${this.cardsUrl}/${card.id}`)
  }

  search(keyword: String): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.cardsUrl}/search/${keyword}`)
  }

  exist(reponse: String) {
    return this.http.get<boolean>(`${this.cardsUrl}/exists/${reponse}`)
  }


}
