import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scheduleiterationhistory',
  templateUrl: './scheduleiterationhistory.component.html',
  styleUrls: ['./scheduleiterationhistory.component.scss'],
})
export class ScheduleIterationHistoryComponent implements OnInit {
  scheduleId!: number;
  scheduleIterationId!: number;

  constructor(private router: ActivatedRoute, private route: Router) {
    this.router.params.subscribe((params) => {
      this.scheduleId = params.scheduleid;
      this.scheduleIterationId = params.scheduleiterationid;
    });
  }

  ngOnInit(): void {}
}
