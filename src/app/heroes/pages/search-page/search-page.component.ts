import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  public heroes: Hero[] = [];
  public searchInput = new FormControl('');
  public selectedHero?: Hero;

  constructor(private readonly heroesService: HeroesService) {}

  searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroesService.getSuggestions(value).subscribe((heroes) => {
      this.heroes = heroes.filter((h) =>
        h.superhero.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value as Hero;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
