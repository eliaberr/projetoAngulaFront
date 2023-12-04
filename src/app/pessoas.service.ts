import { Pessoa } from './models/pessoas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PessoaService{

  pessoas:  Pessoa[] = [];
  baseUrl: string = "http://localhost:8080/pessoas"

  constructor(private http: HttpClient){
  }

  getPessoas(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.baseUrl);
  }


  save(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.post<Pessoa>(this.baseUrl, pessoa);
 }

  update(pessoa: Pessoa): Observable<Pessoa>{
   let url = `${this.baseUrl}/${pessoa.id}`;
   return this.http.put<Pessoa>(url, pessoa);
 }

  delete(pessoa: Pessoa):Observable<void> {
    let url = `${this.baseUrl}/${pessoa.id}`;
    return this.http.delete<void>(url);
 }


}
