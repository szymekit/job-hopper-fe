import { Injectable, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { OffersApiService } from '@shared/api/services/offers-api.service';
import { LandingData } from '@features/landing/model/landing.model';

@Injectable({
  providedIn: 'root',
})
export class LandingFacade {
  private readonly offersApi = inject(OffersApiService);

  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly data = signal<LandingData>({
    hero: {
      badge: 'Dołącz do 4000 użytkowników',
      title: 'Społeczność dzięki której znajdziesz zlecenia i oferty pracy',
      imageUrl:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    },
    categories: [
      {
        id: 'cat-1',
        title: 'Ochrona',
        offerCount: '480 ofert',
        icon: 'shield',
        color: 'green',
      },
      {
        id: 'cat-2',
        title: 'Obsługa klienta',
        offerCount: '120 ofert',
        icon: 'people',
        color: 'pink',
      },
      {
        id: 'cat-3',
        title: 'Sprzedaż',
        offerCount: '800 ofert',
        icon: 'wallet',
        color: 'orange',
      },
      {
        id: 'cat-4',
        title: 'Gastronomia',
        offerCount: '1000+ ofert',
        icon: 'restaurant',
        color: 'purple',
      },
    ],
    jobOffers: [],
    steps: [
      {
        id: 'step-1',
        title: 'Załóż konto i uzupełnij profil',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        imageUrl:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'step-2',
        title: 'A diam maecenas',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        imageUrl:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'step-3',
        title: 'Pharetra et ultrices neque',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        imageUrl:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
    ],
    contentSections: [
      {
        id: 'content-1',
        badge: 'Wyszukiwanie wspierane AI',
        title: 'Stwórz profil i buduj wiarygodność',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
        features: [
          {
            id: 'feat-1',
            title: 'Simple to Use',
            description:
              'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
          },
          {
            id: 'feat-2',
            title: 'Personalized Design',
            description:
              'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
          },
          {
            id: 'feat-3',
            title: 'Status Notifications',
            description:
              'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
          },
          {
            id: 'feat-4',
            title: 'Interactive Templates',
            description:
              'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
          },
        ],
        imageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        imagePosition: 'right',
      },
      {
        id: 'content-2',
        badge: 'Wspierane przez AI',
        title: 'Korzystaj ze sprawdzonych usług',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
        features: [
          {
            id: 'feat-5',
            title: 'Simple to Use',
            description:
              'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
          },
          {
            id: 'feat-6',
            title: 'Personalized Design',
            description:
              'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
          },
          {
            id: 'feat-7',
            title: 'Status Notifications',
            description:
              'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
          },
          {
            id: 'feat-8',
            title: 'Interactive Templates',
            description:
              'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.',
          },
        ],
        imageUrl:
          'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
        imagePosition: 'left',
      },
    ],
    footer: {
      companyInfo: {
        name: 'JobHooper',
        tagline: 'Skokiem zmieniamy rynek pracy na lepsze 💙',
        address: 'Ul. Złota 52, 40-000 Warszawa',
      },
      linkColumns: [
        {
          title: 'Company',
          links: ['About Us', 'News', 'Investor Relations', 'Careers', 'Media Kit'],
        },
        {
          title: 'Resources',
          links: ['Get Started', 'Learn', 'Case Studies'],
        },
        {
          title: 'Developer',
          links: [
            'Courses',
            'Documentation',
            'API Reference',
            'Status',
            'Papers',
            'Development Blog',
          ],
        },
        {
          title: 'Community',
          links: ['Discord', 'Events', 'FAQ', 'Blog'],
        },
        {
          title: 'Connect',
          links: [
            'Newsletters',
            'Press',
            'Code of Conduct',
            'Security Guide',
            'Bug Bounty Program',
          ],
        },
        {
          title: 'Legal',
          links: ['Brand Policy', 'Privacy Policy', 'Terms of Service'],
        },
      ],
      copyright: '© 2025 JobHoope',
    },
  });

  loadJobOffers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.offersApi
      .getAll({ limit: 9 })
      .pipe(
        catchError((error) => {
          this.error.set('Nie udało się załadować ofert pracy.');
          this.loading.set(false);
          return of([]);
        })
      )
      .subscribe((offers) => {
        this.loading.set(false);
        const mappedOffers = offers.map((offer) => ({
          id: offer.id,
          logoUrl: offer.company?.logoUrl || '',
          title: offer.title,
          location: offer.location,
          rate: offer.salaryFrom ? `${offer.salaryFrom} ${offer.currency || 'zł'}/godz.` : '',
          isPopular: false,
          tags: Array.isArray(offer.tags)
            ? offer.tags.map((tag: any) => (typeof tag === 'string' ? tag : tag?.name || '')).filter((t: string) => t)
            : [],
        }));

        this.data.update((current) => ({
          ...current,
          jobOffers: mappedOffers,
        }));
      });
  }
}
