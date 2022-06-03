import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {TransferForm} from "../models/transfer";

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private _http: HttpClient) {
  }

  setTransfer(transfer: TransferForm): Observable<boolean> {
    return this._http.post<boolean>(environment.apiUrl + '/transfer', transfer);
  }

}
