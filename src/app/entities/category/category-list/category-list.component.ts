import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  //Se inicializa un atributo categories que será un array de la entidad Category
  categories: Category[] = [];
  
  constructor(private categoryService: CategoryService) { }

  //Cuando se cargue este componente, automáticamente se llamará al servicio
  ngOnInit(): void {
    this.getCategories();
  }

  //Obtenemos todas las categorías en forma de LISTA
  private getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categoriesRequest) => {this.categories = categoriesRequest;},
      error: (err) => {this.handleError(err);}
    }
    );
  }

  //Gestionamos el error en caso de que falle la petición
  private handleError(error: any): void {
    console.log(error);
  }


}
