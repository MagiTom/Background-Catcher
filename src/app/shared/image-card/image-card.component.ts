import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent  implements OnInit {
  @Input() src = '';
  @Input() author = '';
  @Input() favourite = false;
  @Output() clickAction = new EventEmitter();
  @Output() openCard = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  goToAction(){
    this.clickAction.emit();
  }

  openCardAction(){
    this.openCard.emit();
  }

}
