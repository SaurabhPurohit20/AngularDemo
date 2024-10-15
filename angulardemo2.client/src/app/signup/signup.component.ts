import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) { }

  getForecasts() {
    const body = { name: 'SP', password: '123' }
    this.http.post<any>('/api/register', body).subscribe({
      next: (data) => {console.log({data}) },
      error: (error) => { console.error(error); },
      complete: () => { console.log('Complete'); }
    });
  }
}
