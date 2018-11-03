import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  createProject(project, token) {
    // tslint:disable-next-line:prefer-const
    let header = new HttpHeaders().set('x-auth', token);
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/project/create', project, {
      headers: header
    });
  }

  getProjectByName(name, token) {
    // tslint:disable-next-line:prefer-const
    let header = new HttpHeaders().set('x-auth', token);
    header.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/project/' + name, {
      headers: header
    });
  }
}
