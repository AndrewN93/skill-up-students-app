import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StudentsApiService } from './students-api.service';

describe('StudentsApiService', () => {
  let service: StudentsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: HttpClientModule }
      ]
    });
    service = TestBed.inject(StudentsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
