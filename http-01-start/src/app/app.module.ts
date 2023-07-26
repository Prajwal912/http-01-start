import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorsService } from './auth-interceptors.service';
import { LoggingIntereceptService } from './logging-interecept.service';

@NgModule({
  declarations: [AppComponent],
  //multi used for use the one or more interceptors -- order matters
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS,
               useClass: AuthInterceptorsService,
              multi:true},
              {provide: HTTP_INTERCEPTORS,
                useClass: LoggingIntereceptService,
               multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
