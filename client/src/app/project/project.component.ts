import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SnackbarComponent } from '../snackbar/snackbar.component';

import { MatSnackBar } from '@angular/material';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectDetails: any;
  id: any;

  loader = false;

  newIntentFrom: FormGroup;

  constructor(
    private project: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.newIntentFrom = this.fb.group({
      userQuery: this.fb.array([]),
      response: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data;
      console.log(this.id);
    });
    this.project
      .getProjectById(this.id.id, localStorage.getItem('token'))
      .subscribe(data => {
        this.projectDetails = data;
      });
  }

  get resForms() {
    return this.newIntentFrom.get('response') as FormArray;
  }

  get userQueryForms() {
    return this.newIntentFrom.get('userQuery') as FormArray;
  }

  addRes() {
    const res = this.fb.group({
      responseText: []
    });

    this.resForms.push(res);
  }

  addQuery() {
    const query = this.fb.group({
      queryText: []
    });

    this.userQueryForms.push(query);
  }

  deleteQuery(i) {
    this.userQueryForms.removeAt(i);
  }

  deleteRes(i) {
    this.resForms.removeAt(i);
  }

  async submit() {
    const newUserQuery = await this.newIntentFrom.value['userQuery'];
    const newResponse = await this.newIntentFrom.value['response'];
    this.loader = true;

    this.project
      .updateProject(
        this.id.id,
        localStorage.getItem('token'),
        newUserQuery,
        newResponse
      )
      .subscribe(
        () => {
          this.snackbar.open('Training your bot', '', { duration: 3000 });
          this.newIntentFrom.reset();
          this.loader = false;
        },
        err => {
          this.snackbar.open('Error Training your bot', '', { duration: 3000 });

          console.log(err);
        }
      );
  }
}
