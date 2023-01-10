import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.css']
})
export class AdminSectionComponent implements OnInit {
  
  products!: Product[];
  prodSelected!: any;
  showForm: boolean = false;
  allCategories: Array<any> = [];
  categories: Array<any> = [];
  addProduct: boolean = false;

  constructor(
    private prodService: ProductsService) { }

  ngOnInit(): void {
    this.listProducts();
  }


  showAddProduct(){
    this.addProduct = true;
  }

  /**
   * Lists all products.
   * Inserts name category and id category from each product. 
   * Then, duplicates are removed.
   */
  listProducts(): void {
    if (!this.showForm) {
      this.prodService.getListProducts()
        .subscribe((data: any) => {
          this.products = data;

          //Get All categories
          this.products.forEach(item => {
            return this.allCategories.push({ 'id': item.category.id, 'name': item.category.name })
          });

          this.categories = this.removeDuplicates(this.allCategories, "id");
        });
    }
  }

  /**
   * Updates product
   * showForm variable is set to true
   * @param event 
   * @returns product selected
   */
  updateProduct(event: any) {
    this.prodSelected = event;
    this.showForm = true;
    return this.prodSelected;
  }

  /**
   * Confirms if is the right product to delete
   * Deletes product if it is confirmed
   * @param event product to delete
   */
  confirmDelete(event: any){
    if (confirm("¿Está segura de eliminar este producto?")) {

      let info = {
        id: event.id,
      }

      this.prodService.deleteProduct(info).subscribe(
        (result: any) => {
          if (result) {
            this.deleteProdFromList(event);
            alert("Comentario eliminado correctamente");
          } else {
            alert("El comentario no se ha podido eliminar");
          }
        }
      );
    }
  }


    /**
   * This method removes the product from the list.
   */
     deleteProdFromList(productSelected: any): void {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === productSelected.id) {
          this.products.splice(i, 1);
          break;
        }
      }
    }


  /**
   * Show products list updated
   * @param e 
   */
  showProducts(noShowForm: boolean) {
    this.showForm = noShowForm;
    this.addProduct = false;
    this.listProducts();
  }

  /**
   * Delete duplicate elements and remain the differrent kind of each one
   * @param myArray 
   * @param Prop 
   * @returns array without duplicates
   */
  removeDuplicates(myArray: any, Prop: any) {
    return myArray.filter((obj: any, pos: any, arr: any) => {
      return arr.map((mapObj: { [x: string]: any; }) => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }
}