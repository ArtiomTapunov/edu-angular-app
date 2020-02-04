import { Subject, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean>;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService){}

  ngOnInit() {
    this.subscription = this.loaderService.getLoader().subscribe(loadingState => {
      this.isLoading = loadingState;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
