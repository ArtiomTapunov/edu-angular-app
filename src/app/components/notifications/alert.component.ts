import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
  //styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private subscription: Subscription;
  alertMessage: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success alert-dismissible fade show';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger alert-dismissible fade show';
            break;
          case 'warning':
            message.cssClass = 'alert alert-warning alert-dismissible fade show';
            break;
        }

        this.alertMessage = message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
