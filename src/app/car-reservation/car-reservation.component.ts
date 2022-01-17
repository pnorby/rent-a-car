import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { CarService } from '../car.service';
import {FormControl} from '@angular/forms';

interface CarDisplay {
  id: number;
  year: string;
  make: string;
  model: string;
  title: string;
  mileage: string;
  price: number;
  visual: string;
  description: string;
  available: boolean;
}

interface ReservationDisplay {
  car: CarDisplay;
  from: string;
  to: string;
  fee: number;
  complete: boolean;
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
    const allCars = this.carSvc.loadCars();
    this.cars = allCars.map((x:any) =>({
      ...x,
      title: x.year + " " + x.make + " " + x.model,
      available:true     
    }))
    this.selectedCar = this.cars[0];
    const f = this.selectedCar.price;
    const d = new Date();
    this.currentDay = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
    this.currentTo = this.currentDay;
    this.currentFrom = this.currentDay;
    this.resetDatePickers( this.currentDay, this.currentDay);
    
    this.currentReservation = {
    car: {...this.selectedCar},
    from:'',
    to:'',
    fee: f,
    complete:false

    }
  }
dateFrom = new FormControl(new Date());
dateTo = new FormControl(new Date());

  resetDatePickers = (from: string, to: string) => {
    
    this.dateFrom.setValue(new Date(from));
    this.dateTo.setValue(new Date(to));
    this.currentTo = this.currentDay;
    this.currentFrom = this.currentDay;
  }

  currentDay = '';
  maxRentalsReached = false;
  rentedCars: ReservationDisplay[] = [];
  selectedCar: CarDisplay | undefined = undefined;
  currentFrom = '';
  currentTo = '';
  datesIncorrect = false;
  currentReservation: ReservationDisplay | undefined = undefined;

  cars: CarDisplay[] = [];

  selectCar = (c: CarDisplay) => {
    this.datesIncorrect = false;
    this.resetDatePickers(this.currentDay, this.currentDay);    

    this.selectedCar = c;
    this.currentReservation = {
    car: {...this.selectedCar},
    from: this.currentDay,
    to: this.currentDay,
    fee: this.calculateFee(this.currentTo, this.currentFrom),
    complete: false
    }    
   }

  selectReservation = (r: ReservationDisplay) => {
    this.datesIncorrect = false;  
    this.selectedCar = this.cars.filter(x => x.id == r.car.id)[0];
    //this.cars.filter(x => x == this.selectedCar)[0].available = true;;
    this.currentReservation = r;

      this.resetDatePickers(r.from, r.to);
      
      

  }
  
  toDateChanged = ($event: any) => {
    var d = new Date($event.target.value);
    this.currentTo = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear()
    this.updateReservationFee();     
  }

  fromDateChanged = ($event: any) => {
    var d = new Date($event.target.value);
    this.currentFrom = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() 
    this.updateReservationFee();
  }

  updateReservationFee = () => {
    if(this.currentReservation){
      this.currentReservation.fee = this.calculateFee(this.currentTo, this.currentFrom);
      console.log(this.currentReservation.fee);
    }
  }

  validDates = () => {
    
    var thisDay = new Date();
    thisDay = new Date(thisDay.getMonth() + 1 + "/" + thisDay.getDate() + "/" + thisDay.getFullYear());
    const to = new Date(this.currentTo);
     const from = new Date(this.currentFrom);

     if(to < from || to < thisDay || from < thisDay){
       return false;
     }
     else {
       return true;
     }
  }
    parseDate(s: any) {
      console.log(s);
    var mdy = s.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

    datediff(first: any, second: any) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

calculateFee(first: any, second: any) {
  
  if(this.selectedCar){
    return (this.datediff(this.parseDate(second), this.parseDate(first)) + 1) * this.selectedCar.price;
  }

  return 0;
}

  reserveCar = () => {

    if(this.validDates()){
      this.datesIncorrect = false;
    
    } else {
      this.datesIncorrect = true;
      return;
    }

  if(this.rentedCars.length < 3) {
      if(this.selectedCar){
        this.selectedCar.available = false;

        this.currentReservation = {
          car: {...this.selectedCar},
          from: this.currentFrom,
          to: this.currentTo,
          fee:this.calculateFee(this.currentTo, this.currentFrom),
          complete:true     
          }
      }

     if(this.rentedCars && this.currentReservation){

      this.rentedCars = [
        ...this.rentedCars
        , this.currentReservation
      ];
     } 
   }
   else{
     this.maxRentalsReached = true;
    }
  }

  unReserve = () => {
    this.cars.filter(x => x == this.selectedCar)[0].available = true;
    this.maxRentalsReached = false;

    if(this.currentReservation){
      this.currentReservation.complete = false;      
    }
    const y = (this.selectedCar == undefined? 0 : this.selectedCar.id);
    this.rentedCars = this.rentedCars.filter(x => x.car.id !== y);
    
  }

  
}
