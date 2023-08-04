import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  ForgeAppBarModule,
  ForgeButtonModule,
  ForgeCardModule,
  ForgeDrawerModule, ForgeExpansionPanelModule,
  ForgeIconModule,
  ForgeListProxyModule, ForgePageStateModule, ForgeRippleModule,
  ForgeScaffoldModule, ForgeSkeletonModule, ForgeStepperModule, ForgeTableModule,
  ForgeTextFieldModule,
  ForgeToolbarModule
} from "@tylertech/forge-angular";
import { CodeDummificationComponent } from './components/code-dummification/code-dummification.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ExamplesComponent } from './components/examples/examples.component';
import { MoreSoonComponent } from './components/more-soon/more-soon.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeDummificationComponent,
    ExamplesComponent,
    MoreSoonComponent
  ],
  imports: [
    BrowserModule,
    ForgeScaffoldModule,
    ForgeAppBarModule,
    ForgeDrawerModule,
    ForgeListProxyModule,
    ForgeIconModule,
    ForgeCardModule,
    ForgeToolbarModule,
    ForgeTextFieldModule,
    ForgeButtonModule,
    FormsModule,
    HttpClientModule,
    ForgeExpansionPanelModule,
    ForgeRippleModule,
    ForgePageStateModule,
    ForgeStepperModule,
    ForgeTableModule,
    ForgeSkeletonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
