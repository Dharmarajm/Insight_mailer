import { Component, OnInit, ViewChild, Directive, Output, EventEmitter, HostListener, ElementRef, OnDestroy, Renderer, Inject } from '@angular/core';
import { InventoryService } from './inventory.service';
import { AppService } from './../app.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
//import 'rxjs/add/observable/fromEvent';

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
inventory_scroll: any;
page: any = 1;
enable_scroll: boolean = true;

search_page: number = 1;
filter_search: any;

//@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private InventoryService:InventoryService, public nav: AppService,private spinner: NgxSpinnerService,private el: ElementRef) { }

  ngOnInit() {
  this.page = 1;
  this.search_page = 1;
  this.nav.show();
  this.enable_scroll = true;
  this.spinner.show();
   this.InventoryService.getinventories(this.page).subscribe( res => {
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
   this.spinner.hide();
   });
  }

  onScrollDown(e) {
  const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const buffer = 400;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
   if(this.enable_scroll && this.inventories.length == (20*this.page)){
    this.page = this.page + 1;
    this.InventoryService.getinventories(this.page).debounceTime(200).throttleTime(50).subscribe( res => {
    this.inventory_scroll = res;
    this.inventory_scroll = this.inventory_scroll.map(item => ({
    small_image: item.find_by_asin[0].small_image,
    asin: item.asin,
    sku: item.sku,
    title: item.find_by_asin[0].title,
    price_paisas: item.price_paisas,
    quantity: item.quantity,
    enable: item.enable
  }));
   this.inventory_scroll.map(item => this.inventories.push(item));
   this.dataSource = new MatTableDataSource(this.inventories);
   });
   }else if(!this.enable_scroll && this.inventories.length == (20*this.search_page)){
    this.search_page = this.search_page + 1;
    this.InventoryService.inventory_search(this.filter_search,this.search_page).debounceTime(200).throttleTime(50).subscribe( res => {
    this.inventory_scroll = res;
    this.inventory_scroll = this.inventory_scroll.map(item => ({
    small_image: item.find_by_asin[0].small_image,
    asin: item.asin,
    sku: item.sku,
    title: item.find_by_asin[0].title,
    price_paisas: item.price_paisas,
    quantity: item.quantity,
    enable: item.enable
  }));
   this.inventory_scroll.map(item => this.inventories.push(item));
   this.dataSource = new MatTableDataSource(this.inventories);
   });
   }
}
}
 
  ngAfterViewInit() {   
  }

   applyFilter(filterValue: string) {
   if(filterValue.length > 2){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.search_page = 1;
    this.filter_search = filterValue;
    this.InventoryService.inventory_search(filterValue,this.search_page).subscribe( res => {
    this.inventories = res;
    console.log(this.inventories.length);
    this.inventories = this.inventories.map(item => ({
    small_image: item.find_by_asin[0].small_image,
    asin: item.asin,
    sku: item.sku,
    title: item.find_by_asin[0].title,
    price_paisas: item.price_paisas,
    quantity: item.quantity,
    enable: item.enable
  }));
  // this.inventories.map(item => this.inventories.push(item));
  this.enable_scroll = false;
   this.dataSource = new MatTableDataSource(this.inventories);
   });
  }else{
    if(filterValue.length == 0){
       this.ngOnInit();
    }
  }
    //this.dataSource.filter = filterValue;
    //this.inventories = this.dataSource.filteredData;
  }

  inventory_asin($event,inventory){
  this.inventories.filter((invent) => invent.asin == inventory).map((data) => data.enable = $event.checked);
   this.InventoryService.enable($event.checked,inventory).subscribe( res => {
   });  
  }

}

