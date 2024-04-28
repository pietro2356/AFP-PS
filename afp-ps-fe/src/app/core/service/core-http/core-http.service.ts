import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IPaziente} from "../models/IPaziente";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoreHttpService {
  private readonly BASE_URL = "";

  constructor(private http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.BASE_URL + url);
  }

  public post<T>(url: string, body: Omit<IPaziente, "id">): Observable<T> {
    return this.http.post<T>(this.BASE_URL + url, body);
  }

  public put<T>(url: string, body: IPaziente): Observable<T> {
    return this.http.put<T>(this.BASE_URL + url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.BASE_URL + url);
  }
}
