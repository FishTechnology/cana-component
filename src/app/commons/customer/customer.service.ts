import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerDetail } from './models/CustomerDetail';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor() {}

  getUserDetail(): Observable<CustomerDetail> {
    let customerDetail: CustomerDetail = {
      userName: 'sajajan',
      userId: 10,
    };

    return of(customerDetail);
  }
}
