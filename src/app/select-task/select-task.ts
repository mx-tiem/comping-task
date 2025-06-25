import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-task',
  imports: [],
  templateUrl: './select-task.html',
  styleUrl: './select-task.scss'
})
export class SelectTask {

  constructor(private router: Router) { }

  goToTask(task: string) {
    this.router.navigate([task]);
  }
}
