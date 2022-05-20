import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../category/model/category.model';
import { CategoryService } from '../../category/service/category.service';
import { Item } from '../model/item.model';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  mod: "NEW" | "UPDATE" = "NEW"
  itemId?: number;
  item?: Item;
  selectedCategory?: Category;
  categories: Category[] = [];


  constructor(private route: ActivatedRoute, 
              private itemService: ItemService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {


    const entryParam: string = this.route.snapshot.paramMap.get("itemId") ?? "new";
    if(entryParam !== "new") {
      this.itemId = +this.route.snapshot.paramMap.get("itemId")!;
      this.mod = "UPDATE";
      this.getItemById(this.itemId!);
    } else {
      this.mod = "NEW";
      this.initializeItem();
    }
    this.getAllCategories();
  }

  //Buscador por nombre parcial sobre el nombre de la categoría
  public getAllCategories(event?: any){
    let categorySearch: string | undefined;
    if(event?.query) {
      categorySearch = event.query;
    }
    this.categoryService.getAllCategories(categorySearch).subscribe({
      next: (categoriesFiltered) => { this.categories = categoriesFiltered},
      error: (err) => {this.handleError(err);}
    })
  }
  

  private getItemById(itemId: number) {
    this.itemService.getItemById(itemId).subscribe({
      next: (itemRequest) => {
        this.item = itemRequest;
        this.selectedCategory = new Category(itemRequest.categoryId!, itemRequest.categoryName!);
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  private handleError(err: any): void {
    throw new Error('Method not implemented.');
  }

  private initializeItem(): void {
    this.item = new Item(undefined, "", 0);
  }

  public saveItem(): void {
    if (this.mod === "NEW") {
      this.insertItem();
    }

    if (this.mod === "UPDATE") {
      this.updateItem();
    }
  }

  private insertItem(): void {
    this.itemService.insertItem(this.item!).subscribe({
      next: (itemInserted) => {
        console.log("Inserted item");
        console.log(itemInserted);
        
      },
      error: (err) => {this.handleError(err)}
    })
  }

  private updateItem(): void {
    this.itemService.updateItem(this.item!).subscribe({
      next: (itemUpdated) => {
        console.log("Updated item");
        console.log(itemUpdated);
      },
      error: (err) => {this.handleError(err)}
    })
  }

  public categorySelected(): void {
    this.item!.categoryId = this.selectedCategory?.id;
    this.item!.categoryName = this.selectedCategory?.name;
  }

  public categoryUnselected(): void{
    this.item!.categoryId = undefined;
    this.item!.categoryName = undefined;
  }

}
