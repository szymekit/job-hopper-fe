import { Injectable, signal } from '@angular/core';
import { UserProfileData } from '@features/user-profile/model/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileFacade {
  readonly data = signal<UserProfileData>({
    header: {
      id: 'user-1',
      fullName: 'Tymoteusz Stelmach',
      headline: 'Barista & Coffee Trainer',
      description: 'Trener kawy, szczelny i Szkolenia, degustacja, kultura bycia.',
      avatarUrl:
        'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=200&q=80',
      coverUrl:
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80',
      top10Badge: false,
      activeTab: 'service',
    },
    availableOrders: [
      { id: 'order-1', placeholder: true },
      { id: 'order-2', placeholder: true },
      { id: 'order-3', placeholder: true },
      { id: 'order-4', placeholder: true },
    ],
    basicInfo: {
      citizenship: 'Polskie',
      student: 'Tak',
      noCriminalRecord: 'Tak',
      drivingLicense: 'B1',
    },
    experience: {
      description:
        'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
    },
    qualifications: [
      {
        id: 'qual-1',
        title: 'Uprawnienia na wózek widłowy',
        checked: true,
      },
    ],
    roles: [
      {
        id: 'role-1',
        title: 'Barista',
        level: 'Mistrz',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        hasInfoIcon: true,
        hasSetDefaultButton: true,
        tags: ['Regulacja młynka', 'Latte Art', 'Metody parzenia', 'Zarządzanie zespołem'],
      },
      {
        id: 'role-2',
        title: 'Fotograf',
        level: 'Amator',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        hasInfoIcon: true,
        tags: ['Fotografia eventowa', 'Zdjęcia biznesowe', 'Sesje zdjęciowe', 'Fotografia produktowa'],
      },
    ],
    completedOrders: [
      {
        id: 'order-1',
        companyName: 'Lidl Polska',
        logoUrl: '/assets/lidl-logo.png',
        jobType: 'Współpraca B2B',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        hasInfoIcon: true,
      },
      {
        id: 'order-2',
        companyName: 'A&B',
        logoUrl: '/assets/aldi-logo.png',
        jobType: 'Magazyn',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
        hasInfoIcon: true,
      },
    ],
    certificates: [
      {
        id: 'cert-1',
        title: 'Kurs baristy wstępnego',
        trainingType: 'Szkolenie B2B',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
      },
      {
        id: 'cert-2',
        title: 'Kurs baristy latte',
        trainingType: 'Szkolenie B2B',
        description:
          'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
      },
    ],
    portfolio: [
      {
        id: 'portfolio-1',
        title: 'Przygotowanie latte art',
        imageUrl:
          'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 'portfolio-2',
        title: 'Praca za barem',
        imageUrl:
          'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 'portfolio-3',
        title: 'Kawa z alternatywnych metod',
        imageUrl:
          'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 'portfolio-4',
        title: 'Detal ziaren kawy',
        imageUrl:
          'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 'portfolio-5',
        title: 'Spotkanie w kawiarni',
        imageUrl:
          'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=500&q=80',
      },
    ],
  });
}

