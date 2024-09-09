import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  private readonly http = inject(HttpClient);

  getJSON<T>(path: string) {
    return this.http.get<T>(`assets/json/${path}.json`);
  }
}
