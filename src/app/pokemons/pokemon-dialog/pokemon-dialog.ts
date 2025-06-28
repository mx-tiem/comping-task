import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-pokemon-dialog',
  imports: [],
  templateUrl: './pokemon-dialog.html',
  styleUrl: './pokemon-dialog.scss'
})
export class PokemonDialog implements OnInit {
  data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    debugger
  }
}
