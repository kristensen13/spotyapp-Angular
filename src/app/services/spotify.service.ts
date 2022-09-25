import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQB0BfULe77HYupiQ0GYb8lfnZ6h4gzTM3l8xA9rL6mo-pQhXfXYU89xV8mQQfcxHKNrqLweEdM8AW6XBetdcuLSWIG1N1fU1UZbpZTWKJbh_PQ3XtUQF2XN7YN8tw9tzrtRVgFOBfU6kzgyq3EnEY89UVLU0dYnCVbLM5FjXpMxoVKR6_gz48xE4U5-vaRHtrzP6NutXzIqaSkwR1c',
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    // const headers = new HttpHeaders({
    //   Authorization:
    //     'Bearer BQC3Rgh7VU2lTzt89INLehw7vnuEdq9HBHapx1il0u5AuNNU1B1pGT4gJlDSt6ulsw5ZHoDTSWACC9IUHyc',
    // });
    return this.getQuery('browse/new-releases').pipe(
      map((data: any) => data['albums'].items)
    );
  }

  getArtistas(termino: string) {
    // const headers = new HttpHeaders({
    //   Authorization:
    //     'Bearer BQAalxPjLvrfdtIK-JquYdTQeaiptnOvPfT2lQ3tgYeUzuwVdVwRldpP5vYhbNsx8NdOj5f5SmzHaUQh478',
    // });
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data: any) => data['artists'].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    //.pipe(map((data: any) => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data['tracks'])
    );
  }
}
