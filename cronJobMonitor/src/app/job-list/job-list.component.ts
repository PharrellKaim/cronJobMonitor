import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {

  jobList: any[] = [];
  displayedColumns: string[] = ['key', 'status', 'actions'];
  activeLogs: { [key: string]: string } = {};
  selectedJob: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/internal/jobs')
      .subscribe(data => {
        this.jobList = data;
      });
  }

  startJob(job: any): void {
    this.http.patch(`/api/internal/jobs/${job.key}/execute`, null)
      .subscribe(() => {
        console.log(`Job ${job.key} started`);
      });
  }

  showLogs(job: any): void {
    this.http.get(`/api/internal/jobs/${job.key}/logs`, {responseType: 'text'})
      .subscribe(log => {
        this.selectedJob = job;
        this.activeLogs[job.key] = log;

        setTimeout(() => {
          document.getElementById('logPopup')!.style.display = 'block';
          document.getElementById('overlay')!.style.display = 'block';
        });
      });

  }

  closePopup(): void {
    // close popup and overlay
    document.getElementById('logPopup')!.style.display = 'none';
    document.getElementById('overlay')!.style.display = 'none';
  }
}
