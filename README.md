## Overview

This project is a lightweight **Cron Job Dashboard** built with **Angular** and **Angular Material**. It provides a clear and user-friendly UI to monitor, trigger, and inspect background jobs running on a server.

## 🔧 Features

- ✅ **List of Scheduled Jobs** – Displays all available jobs retrieved from the backend API.
- ▶️ **Trigger Jobs** – Allows users to manually start a job with a single click.
- 📄 **View Logs** – Each job has logs that can be accessed via a popup overlay.
- ❌ **Error Indicator** – Jobs with errors on their last execution are visually marked in red with an error icon.
- ✅ **Success Indicator** – Jobs that succeeded on their last execution are marked with a green check.
- 🔔 **Snackbar Notifications** – Immediate user feedback when a job was triggered.

## 🌐 API Endpoints

- `GET /api/internal/jobs` – Returns job array
- `PATCH /api/internal/jobs/{jobKey}/execute` – Triggers the job
- `GET /api/internal/jobs/{jobKey}/logs` – Returns plain text log output


## 🪲 Faced Problems

A CORS issue occurred when trying to start a job via a PATCH request from the Angular frontend to the backend, which was blocked by the browser. This was resolved by configuring a proxy with a path rewrite in Angular’s proxy.conf.json, allowing the frontend to bypass CORS restrictions during development.

