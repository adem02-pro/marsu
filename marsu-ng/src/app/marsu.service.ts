import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Marsupilami } from './model/Marsupilami'

@Injectable({
  providedIn: 'root'
})
export class MarsuService {
  baseURL: string = 'http://localhost:3000/api/v1'
  connectedMarsu: Marsupilami

  constructor(private http: HttpClient) {
  }

  getMarsus(): Observable<Marsupilami[]> {
    return this.http.get<Marsupilami[]>(`${this.baseURL}/marsus`)
  }

  getMarsu(): Observable<Marsupilami> {
    return this.http.get<Marsupilami>(`${this.baseURL}/marsu`)
  }

  getMarsuById(id: string): Observable<Marsupilami> {
    return this.http.get<Marsupilami>(`${this.baseURL}/marsu/${id}`)
  }

  registerMarsu(newMarsu: Marsupilami): Observable<Marsupilami> {
    return this.http.post<Marsupilami>(`${this.baseURL}/register`, newMarsu)
  }

  editMarsu(marsu: Marsupilami): Observable<Marsupilami> {
    return this.http.put<Marsupilami>(`${this.baseURL}/marsu/${marsu._id}`, marsu)
  }

  login(user: Marsupilami): Observable<Marsupilami> {
    return this.http.post<Marsupilami>(`${this.baseURL}/login`, user)
  }

  logout() {
    sessionStorage.clear()
    return this.http.get<void>(`${this.baseURL}/logout`);
  }

  addFriend(friend: any): Observable<Marsupilami> {
    return this.http.post<Marsupilami>(`${this.baseURL}/add`, friend);
  }

  getFriendsList(): Observable<Marsupilami[]>{
    return this.http.get<Marsupilami[]>(`${this.baseURL}/friends`)
  }

  getNotFriendsList(): Observable<Marsupilami[]> {
    return this.http.get<Marsupilami[]>(`${this.baseURL}/marsus-not-friends`)
  }

  deleteFriend(id: string): Observable<Marsupilami> {
    return this.http.delete<Marsupilami>(`${this.baseURL}/delete/${id}`)
  }
}
