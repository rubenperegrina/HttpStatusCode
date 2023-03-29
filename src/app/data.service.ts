import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  taxes?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private http = inject(HttpClient);

  getOne(id: string) {
    return this.http.get<Product>('apiUrl/products/' + `${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError(() => 'Algo está fallando en el servidor');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => 'El producto no existe');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'No estás autorizado');
          }
          return throwError(() => 'Ups algo salió mal');
        })
      )
  }
}
