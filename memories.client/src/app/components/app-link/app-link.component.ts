import {Component, EventEmitter, Input, input, Output} from '@angular/core';

@Component({
  selector: 'app-link',
  standalone: false,
  templateUrl: './app-link.component.html',
  styleUrl: './app-link.component.css'
})
export class AppLinkComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Input() user?: any;
  close(){
    this.onClick.emit();
  }
}
