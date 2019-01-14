import { Component, OnInit } from '@angular/core';
import { ThingsService } from '../service/things.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-sample',
    templateUrl: './sample.component.html',
})
export class SampleComponent implements OnInit {
    constructor(private thingsService: ThingsService, private router: Router, private route: ActivatedRoute) {}

    listOfThings$: Observable<any[]>;

    ngOnInit(): void {
        this.route.url.subscribe(segments => {
            this.listOfThings$ = this.thingsService.getThings(segments);
        });
    }

    actionButtonClicked(): void {
        this.thingsService.doAction();
    }
}
