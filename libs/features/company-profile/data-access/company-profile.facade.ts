import { Injectable, signal } from '@angular/core';
import { CompanyProfileData } from '@features/company-profile/model/company-profile.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyProfileFacade {
  readonly data = signal<CompanyProfileData>({
    header: {
      id: 'company-1',
      companyName: 'Lidl Polska',
      tagline: 'Dla nas dla Was - z miłości do zakupów',
      logoUrl: '/assets/company-logo.png',
      coverUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
      companyType: 'Sklep',
      location: 'Boryn',
      country: 'Niemcy',
      employeeCount: '5000+ pracowników',
      activeRecruitment: true,
    },
    summaryCards: [
      {
        id: 'card-1',
        label: 'Siedziba główna',
        value: 'Jankowice',
      },
      {
        id: 'card-2',
        label: 'Dostępne stanowiska',
        value: '12 ofert',
      },
      {
        id: 'card-3',
        label: 'Typ etatu',
        value: 'Korporacja',
      },
      {
        id: 'card-4',
        label: 'Działalność podstawowa',
        value: 'Sklep',
      },
    ],
    navigationTabs: [
      {
        id: 'tab-1',
        label: 'O firmie',
        active: true,
      },
      {
        id: 'tab-2',
        label: 'Oferty pracy',
        active: false,
      },
      {
        id: 'tab-3',
        label: 'Benefity',
        active: false,
      },
      {
        id: 'tab-4',
        label: 'Opinie',
        active: false,
      },
      {
        id: 'tab-5',
        label: 'Kontakt',
        active: false,
      },
    ],
    aboutSections: [
      {
        id: 'about-1',
        title: 'O firmie',
        content:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
      },
      {
        id: 'about-2',
        title: 'Nasza misja',
        content:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
      },
    ],
    benefits: [
      {
        id: 'benefit-1',
        title: 'Catering',
        description: 'Darmowe posiłki',
        tags: ['Regularna gimnastyka', 'Latte Art', 'Metody projektowe', 'Zarządzanie zespołem'],
      },
    ],
    portfolio: [
      {
        id: 'portfolio-1',
        imageUrl:
          'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=500&q=80',
        title: 'Portfolio 1',
      },
      {
        id: 'portfolio-2',
        imageUrl:
          'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=500&q=80',
        title: 'Portfolio 2',
      },
      {
        id: 'portfolio-3',
        imageUrl:
          'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=500&q=80',
        title: 'Portfolio 3',
      },
      {
        id: 'portfolio-4',
        imageUrl:
          'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=500&q=80',
        title: 'Portfolio 4',
      },
      {
        id: 'portfolio-5',
        imageUrl:
          'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=500&q=80',
        title: 'Portfolio 5',
      },
    ],
    jobOffers: [
      {
        id: 'job-1',
        title: 'Ekspert / Ekspertka ds. Data Science',
        companyName: 'Lidl Polska',
        location: 'Tarnowo Podgórne',
        employeeCount: '5000+ pracowników',
        activeDays: 'Aktywna przez 14 dni',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        tags: ['Statystyka', 'Analiza', 'Machine learning', 'RDR'],
      },
      {
        id: 'job-2',
        title: 'Ekspert / Ekspertka ds. Data Science',
        companyName: 'Lidl Polska',
        location: 'Tarnowo Podgórne',
        employeeCount: '5000+ pracowników',
        activeDays: 'Aktywna przez 14 dni',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        tags: ['Statystyka', 'Analiza', 'Machine learning', 'RDR'],
      },
    ],
    reviews: [
      {
        id: 'review-1',
        authorInitials: 'A.D.',
        content:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
      },
    ],
    totalReviews: 192,
  });
}
