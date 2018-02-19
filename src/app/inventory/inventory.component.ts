import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

inventories:any;

  constructor(private InventoryService:InventoryService ) { }

  ngOnInit() {
   this.InventoryService.getinventories().subscribe( res => {
   this.inventories = res;
   });
  }

  ngAfterViewInit() {
    
  }

  inventory_asin($event,inventory){
   this.InventoryService.enable($event.checked,inventory).subscribe( res => {
   //res;
   });  
  }

}
