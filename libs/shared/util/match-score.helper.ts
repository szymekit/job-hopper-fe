export interface MatchScoreDisplay {
  label: string;
  color: string;
  percentage: number;
}

export function formatMatchScore(score: number): MatchScoreDisplay {
  const percentage = Math.round(score);

  if (percentage >= 90) {
    return {
      label: 'Doskonale',
      color: 'green',
      percentage,
    };
  } else if (percentage >= 75) {
    return {
      label: 'Bardzo dobrze',
      color: 'green',
      percentage,
    };
  } else if (percentage >= 60) {
    return {
      label: 'Dobrze',
      color: 'yellow',
      percentage,
    };
  } else if (percentage >= 40) {
    return {
      label: 'Średnio',
      color: 'orange',
      percentage,
    };
  } else {
    return {
      label: 'Słabo',
      color: 'red',
      percentage,
    };
  }
}

export function isOfferSaved(offerId: string, savedOffers: Array<{ offerId: string }>): boolean {
  return savedOffers.some((saved) => saved.offerId === offerId);
}

export function isCompanyFollowed(companyId: string, followedCompanies: Array<{ companyId: string }>): boolean {
  return followedCompanies.some((followed) => followed.companyId === companyId);
}

export function getUnreadNotificationsCount(notifications: Array<{ read: boolean }>): number {
  return notifications.filter((n) => !n.read).length;
}
