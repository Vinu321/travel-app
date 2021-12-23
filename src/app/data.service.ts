import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tocken } from './tocken';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  accessTocken: string = "";
  apiUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  searchUrl = "https://test.api.amadeus.com/v3/shopping/hotel-offers";



  login(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    var cid = "d1B1Lknd5gHfCYMVjLGoDUE6hi4zCLAd";
    var se = "iCkWEARhw0PGIoW3";
    var data = "grant_type=client_credentials&client_id=" + cid + "&client_secret=" + se;
  
    console.log("this is the url:", this.apiUrl, data, { headers: headers })
    return this.http.post(this.apiUrl, data, { headers: headers })
  }


  getSearch(id, adult, start, end) {
    var headerS = new HttpHeaders();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessTocken)
    var hid = "?hotelIds=" + id;
    var ad = "&adults=" + adult;
    headerS.append('Authorization', 'Bearer' + this.accessTocken);

    if (this.accessTocken) {
      console.log("access Tocken", this.accessTocken)
      console.log("URL", this.searchUrl + hid + ad, { headers: headers })
      return this.http.get(this.searchUrl + hid + ad, { headers: headers })
    }
  }
}

