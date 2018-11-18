import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  ingredientDeletedSubscription: Subscription;
  ingredientChangedSubscription: Subscription;

  constructor(private shoppingListservice: ShoppingListService) {}

  ngOnInit() {
    this.refreshIngredientList();
    this.ingredientDeletedSubscription = this.shoppingListservice.ingredientDeleted.subscribe(
      ingredient => this.refreshIngredientList()
    );
    this.ingredientChangedSubscription = this.shoppingListservice.ingredientChanged.subscribe(
      ingredient => this.refreshIngredientList()
    );
  }

  onEditItem(ingredientIndex: number) {
    this.shoppingListservice.startedEditing.next(ingredientIndex);
  }

  ngOnDestroy() {
    this.ingredientDeletedSubscription.unsubscribe();
    this.ingredientChangedSubscription.unsubscribe();
  }

  private refreshIngredientList() {
    this.ingredients = this.shoppingListservice.getIngredients();
  }
}
