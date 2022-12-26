import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllHotel(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.host + "/hotel/hotels");
  }

  deleteHotelById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/hotel/delete/" + id);
  }
  saveHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.host + "/hotel", hotel);
  }
  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(this.host + "/hotel/" + id);
  }
  editHotel(hotel:Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(this.host + "/hotel", hotel);
  }
  public getAllHotelByCategory(id:number): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.host + "/hotel/hotels/categoryId/"+id);
  }
  public getAllHotelByActive(active:boolean): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.host + "/hotel/hotels/active/"+active);
  }
  public getAllHotelByState(state:boolean): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.host + "/hotel/hotels/state/"+state);
  }
  public getAllHotelByCategoryPromise(id:number): Promise<Hotel[]> {
    return this.http.get<Hotel[]>(this.host + "/hotel/hotels/categoryId/"+id).toPromise();
  }
  getProductsByCategoryWithPromise(id:number): Promise<Hotel[]> {
    return this.http.get<Hotel[]>(this.host + "/hotel/products/categoryId/"+id).toPromise();
  }
  getHotelByIdV2(id: number): Promise<Hotel> {
    return this.http.get<Hotel>(this.host + "/hotel/" + id).toPromise();
  }
}
