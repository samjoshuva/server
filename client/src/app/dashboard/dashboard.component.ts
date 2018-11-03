import { ProjectService } from './../services/project/project.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private project: ProjectService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  getProject() {
    const { name } = JSON.parse(localStorage.getItem('user'));
    this.project
      .getProjectByName(name, localStorage.getItem('token'))
      .subscribe(console.log);
  }
}
