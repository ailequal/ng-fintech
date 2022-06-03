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

  updateContact(contact: Partial<Contact>): Observable<Contact> {
    // The contact is mandatory, even if we have Partial<Contact>.
    return this._http.put<Contact>(environment.apiUrl + '/contacts/' + contact._id, contact);
  }

  deleteContact(contactId: string): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiUrl + '/contacts/' + contactId)
  }

}
