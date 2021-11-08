import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  loadCars = () =>{
    const cars = [
      {
        id:1,
        year:'2020',
        color:'blue',
        make:'Ford',
        model:'Focus',
        mileage:10000,
        price:40,
        description:'This car is excellent!',
        visual:'/rent-a-car/assets/img/bluecar.png'
      }
      ,
      {
        id:2,
        year:'2021',
        color:'red',
        make:'Chevrolet',
        model:'Cruze',
        mileage:20000,
        price:45,
        description:'This car is awesome!',
        visual:'/rent-a-car/assets/img/redcar.png'
      }
      ,
      {
        id:3,
        year:'2020',
        color:'green',
        make:'Ford',
        model:'Mustang',
        mileage:14500,
        price:50,
        description:'This car is amazing!',
        visual:'/rent-a-car/assets/img/greencar.png'
      }
      ,
      {
        id:4,
        year:'2019',
        color:'orange',
        make:'Chevrolet',
        model:'Impala',
        mileage:10000,
        price:38,
        description:'This car is phenomenal!',
        visual:'/rent-a-car/assets/img/orangecar.png'
      },
      {
        id:5,
        year:'2020',
        color:'yellow',
        make:'Ford',
        model:'Fusion',
        mileage:15000,
        price:35,
        description:'This car is fantastic!',
        visual:'/rent-a-car/assets/img/yellowcar.png'
      }
    ];

    return cars;
  }
}
