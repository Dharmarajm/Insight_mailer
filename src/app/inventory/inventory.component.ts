import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { AppService } from './../app.service';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

inventories:any;
dataSource = new MatTableDataSource;
page1: any;

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
   //res;
   });  
  }

}
