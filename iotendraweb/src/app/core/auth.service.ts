import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginRequest {
  userName: string;
  password: string;
}

interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    console.log('AuthService baseUrl:', this.baseUrl);
  }

  login(data: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data, this.httpOptions);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data, this.httpOptions);
  }

  saveToken(token: string): void {
    localStorage.setItem('iotendra_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('iotendra_token');
  }

  logout(): void {
    localStorage.removeItem('iotendra_token');
  }
}
