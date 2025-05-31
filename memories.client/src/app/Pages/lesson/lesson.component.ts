import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Card } from '../../../model/card';
import { Lesson } from '../../../model/lesson';
import { Location } from '@angular/common';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-lesson',
  standalone: false,
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {
  isLoaded = false;
  cardId!: string;
  isGlobal!: string;
  lessonService: LessonService = inject(LessonService);
  cardService: CardService = inject(CardService);
  card: Card | undefined = undefined;
  lesson!: Lesson;
  count!: number;

  ignoreUserCard = false;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.cardId = params.get('idCard') || '';
      this.isGlobal = params.get('isGlobal') || '';
      this.isLoaded = true;
      const lessonAndCard = await this.lessonService.getCard_W(this.cardId, this.isGlobal);
      this.card = lessonAndCard.card;
      this.lesson = lessonAndCard.lesson;
      this.count = lessonAndCard.count;
      this.isLoaded = false;
    });
  }
  async next() {
    if (!this.card) {
      return;
    }
    this.isLoaded = true;
    await this.lessonService.setIgnore_W(this.lesson.id, this.card.id);
    const lessonAndCard = await this.lessonService.getCard_W(this.cardId, this.isGlobal);
    this.card = lessonAndCard.card;
    this.lesson = lessonAndCard.lesson;
    this.count = lessonAndCard.count;
    this.isLoaded = false;
  }
  async inList() {
    this.location.back();
  }
  async clearTest() {
    this.lessonService.clear_W(this.lesson.id);
    this.location.back();
  }

  async updateIgnoreUserCard(checked: boolean, row: any) {
    const card = row as Card;
    await this.cardService.updateIgnoreUserCard_W(card.id);
  }
}
