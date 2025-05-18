import { Card } from './card';
import { Lesson } from './lesson';

export interface LessonCard {
  lesson: Lesson;
  card: Card;
  count: number;
}