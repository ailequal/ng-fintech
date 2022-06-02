import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DayWithSlot, DayWithSlots, Location} from "../models/location";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _http: HttpClient) {
  }

  getLocations(): Observable<Location[]> {
    return this._http.get<Location[]>(environment.apiUrl + '/locations');
  }

  getSlots(locationId: number): Observable<DayWithSlots[]> {
    return this._http.get<DayWithSlots[]>(environment.apiUrl + '/slots/' + locationId)
  }

  setSchedule(dayWithSlot: DayWithSlot): any {
    const sub = this._http.post<any>(environment.apiUrl + '/schedule', {...dayWithSlot}).subscribe((v) => {
      console.log(v)
    })

    console.log(sub)
  }

}
