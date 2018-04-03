import { Component, OnInit, ViewChild} from '@angular/core';
import { InventoryService } from './inventory.service';
import { AppService } from './../app.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

displayedColumns = ['id','image','asin','sku','title','price','quantity','status'];

inventories:any;
dataSource = new MatTableDataSource;
page1: any;
view: boolean= true;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private InventoryService:InventoryService, public nav: AppService ) { }

  ngOnInit() {
  this.nav.show();
   this.InventoryService.getinventories().subscribe( res => {
   this.inventories = res;
   this.inventories = this.inventories.map(item => ({
  small_image: item.find_by_asin[0].small_image,
  asin: item.asin,
  sku: item.sku,
  title: item.find_by_asin[0].title,
  price_paisas: item.price_paisas,
  quantity: item.quantity,
  enable: item.enable
}));
   this.dataSource = new MatTableDataSource(this.inventories);
   });
  }

  ngAfterViewInit() {
    
  }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.inventories = this.dataSource.filteredData;
  }

  inventory_asin($event,inventory){
   this.InventoryService.enable($event.checked,inventory).subscribe( res => {
   console.log(this.inventories);
   });  
  }

}
