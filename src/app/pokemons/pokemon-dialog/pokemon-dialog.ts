import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

interface PokemonFullDetailInterface {
  id: number,
  name: string,
  height: number,
  weight: number,
  type: string,
  images: string[],
}

@Component({
  selector: 'app-pokemon-dialog',
  imports: [CarouselModule, RouterModule, HttpClientModule],
  templateUrl: './pokemon-dialog.html',
  styleUrl: './pokemon-dialog.scss'
})
export class PokemonDialog implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  pokemon!: PokemonFullDetailInterface

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [ 'prev', 'next' ]
  }

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getPokemonDetails()
  }

  getPokemonDetails() {
    this.http.get(this.data.pokemon.url).subscribe((responseData: any) => {
      this.pokemon = {
        id: responseData.id,
        name: this.upperCaseString(responseData.name),
        height: responseData.height,
        weight: responseData.weight,
        type: responseData.types.map((type: any) => type.type).map((type: any) => this.upperCaseString(type.name)).join(', '),
        images: Object.values(responseData.sprites).filter(spriteValue => typeof spriteValue == 'string'),
      }
    })
  }

  upperCaseString(someString: string) {
    return someString[0].toUpperCase() + someString.slice(1);
  }
}
