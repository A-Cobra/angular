import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../../models/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuPath = 'menu';
  constructor(private http: HttpClient) {}
  getMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      `${environment.dataBaseBaseUrl}/${this.menuPath}`
    );
  }
  getMenuItem(id: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(
      `${environment.dataBaseBaseUrl}/${this.menuPath}/${id}`
    );
  }
}
