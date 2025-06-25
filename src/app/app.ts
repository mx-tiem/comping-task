import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectTask } from "./select-task/select-task";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SelectTask],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'comping-task';
}
