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

  getSlots(locationId: string): Observable<DayWithSlots[]> {
    return this._http.get<DayWithSlots[]>(environment.apiUrl + '/slots/' + locationId)
  }

  setSchedule(schedule: DayWithSlot): Observable<boolean> {
    return this._http.post<boolean>(environment.apiUrl + '/schedule', schedule)
  }

}
