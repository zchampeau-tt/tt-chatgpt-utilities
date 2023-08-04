import { Injectable } from '@angular/core';
import axios from "axios";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  private apiKey = '';
  private apiUrl = 'https://api.openai.com/v1/chat/completions'

  public getGptResponse(messages: any[]): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: messages,
    };

    return this.http.post<any>(this.apiUrl, requestBody, { headers })
  }


  constructor(private http: HttpClient) { }
}
