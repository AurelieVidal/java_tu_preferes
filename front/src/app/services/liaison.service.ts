import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import {HttpClient} from "@angular/common/http";
import {Liaison} from "../models/liaison.model";

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

}
