import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ];

  ingredientDeleted = new Subject<Ingredient>();
  ingredientChanged = new Subject<Ingredient>();
  startedEditing = new Subject<number>();

  constructor() {}

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(newIngredient);
  }

  saveItem(ingredient: Ingredient) {
    const toSave = new Ingredient(ingredient.name, ingredient.amount);
    const indexOfExistingIngredient = this.indexOf(toSave);
    if (indexOfExistingIngredient >= 0) {
      this.ingredients[indexOfExistingIngredient] = toSave;
    } else {
      this.ingredients.push(toSave);
    }
    this.ingredientChanged.next(toSave);
  }

  deleteItem(index: number) {
    const deletedIngredient = this.ingredients.splice(index, 1);
    this.ingredientDeleted.next(deletedIngredient[0]);
  }

  addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients.slice());
  }

  private indexOf(ingredient: Ingredient): number {
    return this.ingredients.findIndex(it => it.name === ingredient.name);
  }
}
