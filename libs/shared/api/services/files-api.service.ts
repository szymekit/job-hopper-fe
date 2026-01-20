import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '@core/config/api.config';
import { FileUploadResponse } from '@shared/api/models/file.model';

@Injectable({
  providedIn: 'root',
})
export class FilesApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_BASE_URL;

  uploadFile(file: File): Observable<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileUploadResponse>(`${this.baseUrl}${API_ENDPOINTS.files.upload}`, formData);
  }
}
