import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../services/project/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(30)
  ]);

  constructor(private project: ProjectService) {}

  ngOnInit() {}

  create() {
    if (this.name.valid) {
      const { name } = JSON.parse(localStorage.getItem('user'));
      const project = {
        name: this.name.value,
        username: name
      };
      this.project
        .createProject(project, localStorage.getItem('token'))
        .subscribe(console.log);
    }
  }
}
