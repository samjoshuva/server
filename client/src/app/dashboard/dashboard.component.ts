import { ProjectService } from './../services/project/project.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allProjects: any;
  constructor(
    private project: ProjectService,
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    const { name } = JSON.parse(localStorage.getItem('user'));
    this.project
      .getProjectByName(name, localStorage.getItem('token'))
      .subscribe(data => {
        this.allProjects = data;
      });
  }

  navProject(id) {
    console.log(id);
    this.router.navigate(['/project/' + id]);
  }
}
