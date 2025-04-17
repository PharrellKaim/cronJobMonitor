import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';

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
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {

  jobList: any[] = [];
  displayedColumns: string[] = ['key', 'status', 'actions'];
  activeLogs: { [key: string]: string } = {};
  selectedJob: any = null;

  constructor(private http: HttpClient,  private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/internal/jobs')
      .subscribe(data => {
        this.jobList = data;
      });
  }

  startJob(job: any): void {
    this.http.patch(`/api/internal/jobs/${job.key}/execute`, null)
      .subscribe(() => {
        this.snackBar.open(`Job ${job.key} started!`, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
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

  copyLogs(): void {
    const logContent = this.activeLogs[this.selectedJob?.key];

    // Copy logs if available
    if (logContent) {
      navigator.clipboard.writeText(logContent).then(() => {
        this.snackBar.open('Logs copied to clipboard!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }, (error) => {
        this.snackBar.open('Failed to copy logs!', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      });
    }
  }
}
