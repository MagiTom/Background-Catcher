import {Component, Input, OnInit} from '@angular/core';
import {IonContent} from "@ionic/angular";

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss'],
})
export class ScrollTopButtonComponent  implements OnInit {
  @Input() content!: IonContent;
  constructor() { }

  ngOnInit() {}

  scrollToTop() {
    console.log('click',  this.content)
    this.content.scrollToTop(1000).then();
  }
}
