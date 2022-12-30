import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee-viewer',
  templateUrl: './employee-viewer.component.html',
  styleUrls: ['./employee-viewer.component.scss'],
})
export class EmployeeViewerComponent {
  @Input()
  shortenedContent = false;
  constructor() {}
}
