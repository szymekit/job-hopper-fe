import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { formatMatchScore } from '@shared/util/match-score.helper';

@Component({
  selector: 'jh-match-score-badge',
  standalone: true,
  templateUrl: './match-score-badge.component.html',
  styleUrls: ['./match-score-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchScoreBadgeComponent {
  score = input.required<number>();
  display = computed(() => formatMatchScore(this.score()));
}
