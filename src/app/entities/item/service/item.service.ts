import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  //Se inyecta en el constructor el módulo HttpClient para poder hacer peticiones al backend
  constructor(private http: HttpClient) { }

  //Se crea un método para obtener todas las categórias, que será un Observable y devolverá una LISTA de Categorías
  public getAllItems(page: number, size: number, sort: string, filters?: string): Observable<Item[]> {
    let urlEndpoint: string = "http://localhost:8080/store/items?page=" + page + "&size=" + size + "&sort=" + sort;
    if (filters) {
      urlEndpoint = urlEndpoint + "&filter=" + filters;
    }
    return this.http.get<Item[]>(urlEndpoint);
  }

  /*public getAllItemsByCategoryId(categoryId: number): Observable<Item[]> {
    const urlEndpoint: string = "http://localhost:8080/store/categories/" + categoryId + "/items";
    return this.http.get<Item[]>(urlEndpoint);
  }*/

  public deleteItem(itemToDlete: number): Observable<any> {
    let urlEndpoint: string = "http://localhost:8080/store/items/" + itemToDlete;
    return this.http.delete<any>(urlEndpoint);
  }

  public getItemById(itemId: number): Observable<Item> {
    let urlEndpoint: string = "http://localhost:8080/store/items/" + itemId;
    return this.http.get<Item>(urlEndpoint);
  }

  public insertItem(item: Item): Observable<Item> {
    let urlEndpoint: string = "http://localhost:8080/store/items/";
    return this.http.post<Item>(urlEndpoint, item);
  }

  public updateItem(item: Item): Observable<Item> {
    let urlEndpoint: string = "http://localhost:8080/store/items/";
    return this.http.patch<Item>(urlEndpoint, item);
  }
}
