import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constants/api';
import { Observable, BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage.service';

declare interface AuthResponse {
  code: number;
  msg: string;
  token: string;
  userId: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public isAuth: BehaviorSubject<boolean>;
  constructor(private httpClient: HttpClient, private storageService: StorageService) {
    this.isAuth = new BehaviorSubject(this.storageService.getUserId() !== null);
  }

  signin(login: {username: string, password: string}) :Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(API.URL + API.AUTH.SIGNIN, login);
  }

  signup(register: {username: string, password: string}): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(API.URL + API.AUTH.SIGNUp, register);
  }

  getAuthValue(): boolean {
    return this.isAuth.value;
  }
}
