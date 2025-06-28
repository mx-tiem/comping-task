import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDialog } from './pokemon-dialog/pokemon-dialog';


interface PokemonInterface {
  id: number,
  name: string,
  height: number,
  weight: number,
  type: string,
  image: string,
  url: string,
}

@Component({
  selector: 'app-pokemons',
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, RouterLink, HttpClientModule],
  templateUrl: './pokemons.html',
  styleUrl: './pokemons.scss'
})
export class Pokemons implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'name', 'height', 'weight', 'type'];
  dataSource = new MatTableDataSource<PokemonInterface>([]);

  pageSizeOptions = [5, 10, 25, 50, 100]
  selectedPageSize = 10
  pageIndex = 0
  totalLength = 0

  allPokemonsBasicData: {name: string, url: string}[] = []
  collectedPokemonData: PokemonInterface[] = []

  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.catchSomePokemons()
  }

  catchSomePokemons() {
    this.collectedPokemonData = []
    this.http.get(this.buildPokeApiRoute()).subscribe(
      (responseData: any) => {
        this.allPokemonsBasicData = responseData.results
        this.collectDetailData()
        this.totalLength = responseData.count
      }, errorData => {
        // implement snackbar
      })
  }

  collectDetailData() {
    this.allPokemonsBasicData.forEach(basicPokemon => {
      this.collectSinglePokemonDetails(basicPokemon)
    })
  }

  collectSinglePokemonDetails(pokemon: {name: string, url: string}) {
    this.http.get(pokemon.url).subscribe((singlePokemondata: any) => {
      this.collectedPokemonData.push({
        id: singlePokemondata.id,
        name: this.upperCaseString(singlePokemondata.name),
        height: singlePokemondata.height,
        weight: singlePokemondata.weight,
        type: singlePokemondata.types.map((type: any) => type.type).map((type: any) => this.upperCaseString(type.name)).join(', '),
        image: singlePokemondata.sprites.front_default,
        url: pokemon.url,
      })

      this.dataSource.data = this.collectedPokemonData.sort((a, b) => a.id - b.id)
    })
  }

  handlePageEvent(event: any) {
    if (this.selectedPageSize != event.pageSize) {
      this.selectedPageSize = event.pageSize
      this.pageIndex = 0
    } else if (this.pageIndex != event.pageIndex) {
      this.pageIndex = event.pageIndex
    }
    this.catchSomePokemons()
  }
  openDialog(pokemon: PokemonInterface) {
    const dialogRef = this.dialog.open(PokemonDialog, {
      width: '50vw',
      maxWidth: '80vw',
      height: '75vh',
      data: { pokemon: pokemon }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  buildPokeApiRoute() {
    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon?limit=${this.selectedPageSize}`
    const pageOffset = this.pageIndex * this.selectedPageSize
    pageOffset > 0 ?  pokemonUrl += `&offset=${pageOffset}` : ''
    return pokemonUrl
  }

  upperCaseString(someString: string) {
    return someString[0].toUpperCase() + someString.slice(1);
  }
}