import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const API_HOST = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  token: string;

  constructor(private http: HttpClient) {
  }

  static handleError(error: Error) {
    alert(error.message);
  }

  static extractData(res: HttpEvent<any>) {
    const body = res;
    return body || { };
  }

  setAuthToken(token) {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `jwt ${token}`);
    this.token = token;
  }

  async get(endpoint): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    const req = this.http.get(url, this.httpOptions).pipe(map(ApiService.extractData));

    try {
      return await req
        .toPromise();
    } catch (e) {
      ApiService.handleError(e);
      throw e;
    }
  }

  async post(endpoint, data): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    try {
      return await this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
        .toPromise();
    } catch (e) {
      ApiService.handleError(e);
      throw e;
    }
  }

  async put(id, endpoint, data): Promise<any> {
    const url = `${API_HOST}${endpoint}/${id}`;
    try {
      return await this.http.put<HttpEvent<any>>(url, data, this.httpOptions)
        .toPromise();
    } catch (e) {
      ApiService.handleError(e);
      throw e;
    }
  }

  async delete(id, endpoint): Promise<any> {
    const url = `${API_HOST}${endpoint}/${id}`;
    try {
      await this.http.delete(url, {responseType: 'text'})
        .toPromise();
      return location.reload();
    } catch (e) {
      ApiService.handleError(e);
      throw e;
    }
  }

  async upload(endpoint: string, file: File, payload: any): Promise<any> {
    const signed_url = (await this.get(`${endpoint}/signed-url/${file.name}`)).url;

    const headers = new HttpHeaders({'Content-Type': file.type});
    const req = new HttpRequest( 'PUT', signed_url, file,
                                  {
                                    headers: headers,
                                    reportProgress: true,
                                  });

    return new Promise ( resolve => {
        this.http.request(req).subscribe((resp) => {
        if (resp && (<any> resp).status && (<any> resp).status === 200) {
          resolve(this.post(endpoint, payload));
        }
      });
    });
  }
  
  async update(id: number, endpoint: string, file: File, payload: any): Promise<any> {
    const signed_url = (await this.get(`${endpoint}/signed-url/${file.name}`)).url;

    const headers = new HttpHeaders({'Content-Type': file.type});
    const req = new HttpRequest( 'PUT', signed_url, file,
                                  {
                                    headers: headers,
                                    reportProgress: true,
                                  });

    return new Promise ( resolve => {
        this.http.request(req).subscribe((resp) => {
        if (resp && (<any> resp).status && (<any> resp).status === 200) {
          resolve(this.put(id, endpoint, payload));
        }
      });
    });
  }
  
  async remove(id: number, endpoint: string): Promise<any> {
    return new Promise ( resolve => {
      resolve(this.delete(id, endpoint));
    });
  }
}
