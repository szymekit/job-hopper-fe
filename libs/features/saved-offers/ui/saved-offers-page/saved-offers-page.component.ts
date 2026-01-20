import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SavedOffersFacade } from '@features/saved-offers/data-access/saved-offers.facade';

@Component({
  selector: 'jh-saved-offers-page',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './saved-offers-page.component.html',
  styleUrls: ['./saved-offers-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedOffersPageComponent implements OnInit {
  private readonly facade = inject(SavedOffersFacade);

  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly offers = this.facade.offers;

  ngOnInit(): void {
    this.facade.loadOffers();
  }
}
