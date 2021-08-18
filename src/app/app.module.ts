import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueContributionComponent } from './value-contribution/value-contribution.component';
// import { InsightsComponent } from './insights/insights.component';

@NgModule({
  declarations: [
    AppComponent,
    ValueContributionComponent,
    // InsightsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
