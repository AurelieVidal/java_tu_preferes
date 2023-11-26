import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {HttpClient} from "@angular/common/http";
import {ThemeModel} from "../models/themes.model";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private themeUrl = "http://localhost:8080/themes"

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<ThemeModel[]> {
    return this.http.get<ThemeModel[]>(this.themeUrl)
  }

  findById(id: number): Observable<ThemeModel> {
    return this.http.get<ThemeModel>(`${this.themeUrl}/${id}`)
  }

  update(id: number, theme: ThemeModel): Observable<ThemeModel> {
    return this.http.post<ThemeModel>(`${this.themeUrl}/${id}`, theme)
  }

  create(theme: ThemeModel): Observable<ThemeModel> {
    return this.http.post<ThemeModel>(this.themeUrl, theme)
  }

  delete(theme: ThemeModel) {
    return this.http.delete(`${this.themeUrl}/${theme.id}`)
  }

  search(keyword: String): Observable<ThemeModel[]> {
    return this.http.get<ThemeModel[]>(`${this.themeUrl}/search/${keyword}`)
  }


}
