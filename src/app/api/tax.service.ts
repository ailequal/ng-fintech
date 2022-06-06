import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private _http: HttpClient) {
  }

  // TODO: The tax parameter is set to any...
  setTax(tax: any): Observable<boolean> {
    return this._http.post<boolean>(environment.apiUrl + '/taxes', tax);
  }

}
