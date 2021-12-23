import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tocken } from '../tocken';
import { DataService } from '../data.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export class User {
  public hotel: string;
  public adult: string;
  public startD: string;
  public endD: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formGroup: FormGroup;
  tockeb: tocken;
  table: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private data: DataService) { }
  displayedColumns: string[] = ['hotelId', 'name', 'type', 'dupeId', 'chainCode', 'cityCode'];
  dataSource = [];
  model = new User();
  value: Date;
  bsValue = new Date();
  bsRangeValue: Date[];
  //  maxDate = new Date();
  minDate = new Date();

  apiUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

  access;
  detail = [];
  hotels: any = [];
  listHotels: any = []
  search(form) {
    this.hotels = []
    this.table = false;
    this.detail = [];
    this.listHotels = [];
    let d = new Date(Date.parse(form.value.startD))
    let e = new Date(Date.parse(form.value.endD))
    let startDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    let endDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    let adultCount = form.value.adult;
    let hotelId = form.value.hotel;
    this.data.getSearch(hotelId, adultCount, startDate, endDate).subscribe(resp => {
      this.hotels = resp;
      let ans = this.hotels.data;
      ans.forEach(element => {
        if (!ans.includes(element.hotel)) {
          this.listHotels.push(element.hotel)
        }
        this.table = true
        this.detail = this.listHotels
        console.log("details", this.detail)
      });
    })

  }

  ex() {
    this.data.login().subscribe(resp => {
      this.tockeb = resp;
      console.log("resp", resp)
      this.data.accessTocken = this.tockeb.access_token;
    })
  }


  ngOnInit(): void {
    this.ex();
  }
}
