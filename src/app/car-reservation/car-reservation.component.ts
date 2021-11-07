import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

interface CarDisplay {
  id: Number;
  title: string;
  visual: string;
  description: string;
}

@Component({
  selector: 'app-car-reservation',
  templateUrl: './car-reservation.component.html',
  styleUrls: ['./car-reservation.component.css']
})
export class CarReservationComponent implements OnInit {

  constructor(
    public carSvc: CarService
  ) { }

  ngOnInit(): void {
    this.allCars = this.carSvc.loadCars();
    this.availableCars = this.allCars.map((x:any) =>({
      id: x.id,
      title: x.year + " " + x.make + " " + x.model,
      description: x.description,
      available:true     
    }))
    
    this.selectedCar = this.allCars[0];
  }
  maxRentalsReached = false;
  allCars: any = [];
  rentedCars: CarDisplay[] = [];
  selectedCar: any;
  availableCars: CarDisplay[] = [];

  selectCar = (c: CarDisplay) => {
    this.selectedCar = this.allCars.filter((x: any) => x.id == c.id)[0];
  } 

  reserveCar = () => {
    if(this.rentedCars.length < 3){
    this.rentedCars = [
      ...this.rentedCars,
      this.availableCars.filter(x => x.id == this.selectedCar.id)[0]
    ];

    this.availableCars = this.availableCars.filter(x => x.id != this.selectedCar.id); 
    this.selectedCar = this.allCars.filter((x:any) => x.id == this.availableCars[0].id)[0];
  }
  else{
    this.maxRentalsReached = true;
  }
    
  }

  unReserve = (c: CarDisplay) => {
    this.availableCars = this.availableCars = this.rentedCars.filter(x => x == this.selectedCar.id);
    this.rentedCars = this.rentedCars.filter(x => x.id != c.id);
  }
}
