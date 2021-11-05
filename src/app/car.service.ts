import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  loadCars = () =>{
    const cars: any[] = [
      {
        year:'2020',
        color:'blue',
        make:'Ford',
        model:'Focus',
        mileage:10000,
        price:40,
        description:'This car is excellent!',
        visual:'/assets/img/bluecar.png'
      }
      ,
      {
        year:'2021',
        color:'red',
        make:'Chevrolet',
        model:'Cruze',
        mileage:20000,
        price:45,
        description:'This car is awesome!',
        visual:'/assets/img/redcar.png'
      }
      ,
      {
        year:'2020',
        color:'green',
        make:'Ford',
        model:'Mustang',
        mileage:14500,
        price:50,
        description:'This car is amazing!',
        visual:'/assets/img/greencar.png'
      }
      ,
      {
        year:'2019',
        color:'orange',
        make:'Chevrolet',
        model:'Impala',
        mileage:10000,
        price:38,
        description:'This car is phenomenal!',
        visual:'/assets/img/orangecar.png'
      },
      {
        year:'2020',
        color:'yellow',
        make:'Ford',
        model:'Fusion',
        mileage:15000,
        price:35,
        description:'This car is fantastic!',
        visual:'/assets/img/yellowcar.png'
      }
    ];

    return cars;
  }
}
