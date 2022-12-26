import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  host = environment.host;
  constructor(private http: HttpClient) {}
  public getAllRoom(): Observable<Room[]> {
    return this.http.get<Room[]>(this.host + "/room/rooms");
  }
  deleteRoomById(id: number): Observable<void> {
    return this.http.delete<void>(this.host + "/room/delete/" + id);
  }
  saveRoom(room :Room): Observable<Room> {
    return this.http.post<Room>(this.host + "/room", room);
  }
  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(this.host + "/room/" + id);
  }
  editRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(this.host + "/room", room);
  }
  public getAllRoomDipoByHotel(id:any): Observable<Room[]> {
    return this.http.get<Room[]>(this.host + "/room/roomsDispoByHotel/"+id);
  }

  public getAllRoomNonDipo(id:any): Observable<Room[]> {
    return this.http.get<Room[]>(this.host + "/room/roomsNonDispoByHotel/"+id);
  }
  public getAllRoomPromo(id:any): Observable<Room[]> {
    return this.http.get<Room[]>(this.host + "/room/roomPromoByHotel/"+id);
  }
  public getAllRoomNonPromo(id:any): Observable<Room[]> {
    return this.http.get<Room[]>(this.host + "/room/roomNonPromoByHotel/"+id);
  }
  public getAllRoomsByHotel(id:any): Observable<Room[]> {
    return this.http.get<Room[]>(this.host + "/room/getAllRoomsByHotel/"+id);
  }

}
