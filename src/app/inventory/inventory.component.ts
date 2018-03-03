import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
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

  constructor(private InventoryService:InventoryService ) { }

  ngOnInit() {
   this.InventoryService.getinventories().subscribe( res => {
   this.inventories = res;
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
