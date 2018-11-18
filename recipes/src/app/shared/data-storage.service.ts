import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private databaseURL = 'https://ng-recipe-book-32aba.firebaseio.com';
  private recipesURL = this.databaseURL + '/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    return this.httpClient.put(
      this.recipesURL,
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    return this.httpClient
      .get<Recipe[]>(this.recipesURL)
      .pipe(
        map(recipes => {
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        })
      )
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
