import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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


  constructor(private route: ActivatedRoute, 
              private itemService: ItemService) { }

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
  }
  

  private getItemById(itemId: number) {
    this.itemService.getItemById(itemId).subscribe({
      next: (itemRequest) => {
        this.item = itemRequest;
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

}
