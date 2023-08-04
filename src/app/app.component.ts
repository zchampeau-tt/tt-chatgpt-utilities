import { Component } from '@angular/core';
import { IconRegistry } from '@tylertech/forge';
import { tylIconCodeTagsCheck, tylIconTestTube } from '@tylertech/tyler-icons/extended';
import { tylIconTagFaces } from '@tylertech/tyler-icons/standard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private activePage = 0;
  private title = 'ChatGPT Utilities';

  public setActivePage(page: number): void {
    this.activePage = page;
  }

  public getActivePage(): number {
    return this.activePage;
  }

  constructor() {
    IconRegistry.define([
      tylIconCodeTagsCheck,
      tylIconTestTube,
      tylIconTagFaces
    ]);
  }
}
