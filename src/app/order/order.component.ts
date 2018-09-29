import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { AppService } from './../app.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  start_date:any;
end_date: any;

displayedColumns = ['id', 'amazon_order_id', 'asin', 'seller_sku', 'title','buyer_name', 'purchased_at','shipment_status'];

dataSource = new MatTableDataSource();

orders: any = [];
orders_scroll: any = [];
order_scroll: boolean = true;
page: any = 1;
search_page: number = 1;
filter_search: any;

dateShow:boolean;
min_date:any;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor( public OrderService:OrderService, public nav: AppService,private spinner: NgxSpinnerService) { }

  applyFilter(filterValue: string) {
   if(filterValue.length > 2){
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.search_page = 1;
    this.filter_search = filterValue;
    this.OrderService.order_search(filterValue,this.search_page).subscribe( res => {
      this.orders = res;
      
      this.orders = this.orders.map(item => ({
      amazon_order_id: item.amazon_order_id,
      asin: item.find_order[0].asin,
      seller_sku: item.find_order[0].seller_sku,
      title: item.find_order[0].title,
      buyer_name: item.buyer_name,
      purchased_at: item.purchased_at,
      tfm_shipment_status: item.tfm_shipment_status,
      status: item.status
  }));
   this.dataSource = new MatTableDataSource(this.orders);
   this.order_scroll = false;
   });
  }else{
    if(filterValue.length == 0){
       this.ngOnInit();
    }
  }
}

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
  this.nav.show();
  this.spinner.show();
   this.page = 1;
   this.search_page = 1;
   this.order_scroll = true;
   this.OrderService.getorders(this.page).subscribe( res => {
   this.orders = res;
  
   this.orders = this.orders.map(item => ({
  amazon_order_id: item.amazon_order_id,
  asin: item.find_order[0].asin,
  seller_sku: item.find_order[0].seller_sku,
  title: item.find_order[0].title,
  buyer_name: item.buyer_name,
  purchased_at: item.purchased_at,
  tfm_shipment_status: item.tfm_shipment_status,
  status: item.status
}));

console.log(this.orders);

   this.dataSource = new MatTableDataSource(this.orders);
   this.spinner.hide();
   });

   this.dateShow=true;
 this.min_date = new Date()
  }

sortData(ss){
  console.log(ss);
   this.OrderService.getsortorders(this.page,ss.active,ss.direction).subscribe( res => {
   this.orders = res;
  
   this.orders = this.orders.map(item => ({
  amazon_order_id: item.amazon_order_id,
  asin: item.find_order[0].asin,
  seller_sku: item.find_order[0].seller_sku,
  title: item.find_order[0].title,
  buyer_name: item.buyer_name,
  purchased_at: item.purchased_at,
  tfm_shipment_status: item.tfm_shipment_status,
  status: item.status
}));

console.log(this.orders);

   this.dataSource = new MatTableDataSource(this.orders);
   this.spinner.hide();
   });

}
  dateSubmit(){
     console.log(this.start_date,this.end_date)

    if(this.start_date == null || this.end_date==null){
      alert("Please Select From Date and Todate");
      return;
    }
   

     this.OrderService.date_search(this.start_date,this.end_date).subscribe( res => { 
       this.dateShow=false;
       this.orders = res;
   this.orders = this.orders.map(item => ({
  amazon_order_id: item.amazon_order_id,
  asin: item.find_order[0].asin,
  seller_sku: item.find_order[0].seller_sku,
  title: item.find_order[0].title,
  buyer_name: item.buyer_name,
  purchased_at: item.purchased_at,
  tfm_shipment_status: item.tfm_shipment_status,
  status: item.status
}));
 this.dataSource =new MatTableDataSource(this.orders);

     })

  }

  onScroll(e) {
  const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const buffer = 400;
    const limit = tableScrollHeight - tableViewHeight - buffer;

   if (scrollLocation > limit && this.dateShow==true) {
   if(this.order_scroll && this.orders.length == (20*this.page)){
     
    this.page = this.page + 1;
   this.OrderService.getorders(this.page).debounceTime(200).throttleTime(50).subscribe( res => {
   this.orders_scroll = res;
   this.orders_scroll = this.orders_scroll.map(item => ({
   amazon_order_id: item.amazon_order_id,
   asin: item.find_order[0].asin,
   seller_sku: item.find_order[0].seller_sku,
   title: item.find_order[0].title,
   buyer_name: item.buyer_name,
   purchased_at: item.purchased_at,
   tfm_shipment_status: item.tfm_shipment_status,
   status: item.status
}));
   this.orders_scroll.map(item => this.orders.push(item));
   this.dataSource = new MatTableDataSource(this.orders);
   });
    }else if(!this.order_scroll && this.orders.length == (20*this.search_page)){
     this.search_page = this.search_page + 1;
     this.OrderService.order_search(this.filter_search,this.search_page).debounceTime(400).throttleTime(400).subscribe( res => {
      this.orders_scroll = res;
      this.orders_scroll = this.orders_scroll.map(item => ({
      amazon_order_id: item.amazon_order_id,
      asin: item.find_order[0].asin,
      seller_sku: item.find_order[0].seller_sku,
      title: item.find_order[0].title,
      buyer_name: item.buyer_name,
      purchased_at: item.purchased_at,
      tfm_shipment_status: item.tfm_shipment_status,
      status: item.status
  }));
  this.orders_scroll.map(item => this.orders.push(item));
   this.dataSource = new MatTableDataSource(this.orders);
   });
    }

  }

}


}