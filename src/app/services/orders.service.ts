import { User } from '../models/user';
import { Order } from './../models/order';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  getNextId(){
    let orders = this.getAllOrders();
    if(!orders){
      return 1;
    }else{
      let maxId = 0;
      orders.find((order) => { 
        if (order.id > maxId)
          maxId = order.id;
      });
      return maxId + 1;
    }
  }

  sendOrder(order: Order) : void{
    let orders: Array<Order> = this.getAllOrders();
    if(order.cart.length > 0){
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
    } 
  }

  getAllOrders() : Array<Order>{
    let orders = JSON.parse(localStorage.getItem('orders')!);
    if(!orders)
      return [];
    else
      return orders;
  }

  getOrdersByUser(user: User): Array<Order>{
    let orders: Array<Order> = this.getAllOrders();
    let ordersByUser : Array<Order> = [];
    for(let i = 0; i < orders.length; i++){
      if(orders[i].user.id == user.id){
        console.log(JSON.stringify(orders[i]));
        ordersByUser.push(orders[i]);
      }
    }
    return ordersByUser;
  }
}

