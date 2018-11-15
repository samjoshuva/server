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
    return this.http.get('http://localhost:3000/api/project/username/' + name, {
      headers: header
    });
  }

  getProjectById(id, token) {
    // tslint:disable-next-line:prefer-const
    let header = new HttpHeaders().set('x-auth', token);
    header.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/project/id/' + id, {
      headers: header
    });
  }

  updateProject(id, token, query, response) {
    // tslint:disable-next-line:prefer-const
    let header = new HttpHeaders().set('x-auth', token);
    header.append('Content-Type', 'application/json');

    const project = { query: query, response: response };

    return this.http.put(
      'http://localhost:3000/api/project/update/' + id,
      project,
      {
        headers: header
      }
    );
  }
}
