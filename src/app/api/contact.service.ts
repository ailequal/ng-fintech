import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Contact, ContactForm} from "../models/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: HttpClient) {
  }

  getContacts(): Observable<Contact[]> {
    return this._http.get<Contact[]>(environment.apiUrl + '/contacts');
  }

  setContact(contact: ContactForm): Observable<Contact> {
    return this._http.post<Contact>(environment.apiUrl + '/contacts', contact);
  }

  updateContact(contactId: string, contact: Partial<Contact>): Observable<Contact> {
    return this._http.put<Contact>(environment.apiUrl + '/contacts/' + contactId, contact);
  }

  deleteContact(contactId: string): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiUrl + '/contacts/' + contactId)
  }

}
