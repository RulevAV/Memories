import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-lesson',
  standalone: false,
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit  {
  cardId!: string;
  isGlobal!: string;
  lessonService: LessonService = inject(LessonService);

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  
  ngOnInit() {
    this.lessonService.GetCard('29eeafc3-f401-48bc-a5e2-08d97c0a997b',true).subscribe();
    this.route.paramMap.subscribe(async params => {
      this.cardId = params.get('idCard')||'';
      this.isGlobal = params.get('isGlobal')||'';
    });
  }
}
