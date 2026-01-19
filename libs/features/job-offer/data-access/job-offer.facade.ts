import { Injectable, signal } from '@angular/core';
import { JobOfferData } from '@features/job-offer/model/job-offer.model';

@Injectable({
  providedIn: 'root',
})
export class JobOfferFacade {
  readonly data = signal<JobOfferData>({
    details: {
      id: 'job-1',
      title: 'Ekspert / Ekspertka ds. Data Science',
      header: {
        logoUrl: '/assets/lidl-logo.png',
        companyName: 'Lidl Polska',
        location: 'Tarnowo Podgórne',
      },
      salary: '5000 zł brutto/miesiąc',
      activeDays: 'Aktywna przez 11 dni',
      description:
        'Rhoncus dolor purus non enim praesent elementum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel.',
      tags: ['Statystyka', 'Analiza', 'Machine learning', 'UoP'],
    },
    about: {
      id: 'about-1',
      title: 'O ofercie pracy',
      items: [
        'Praca end-to-end nad modelami maszynowego uczenia (ML) - od konceptualizacji na podstawie wymagań biznesowych, poprzez przygotowanie danych, prototypowanie modelu do wdrożenia operacyjnego rozwiązania',
        'Monitorowanie wdrożonych modeli, analiza ich rezultatów oraz wprowadzanie usprawnień',
        'Wspieranie działów merytorycznych i kadry zarządzającej w podejmowaniu bieżących decyzji poprzez dostarczanie informacji opartych na analizie dużych zbiorów (np. poprzez tworzenie analiz "deep-dive" opartych na modelach statystycznych)',
        'Staniesz się częścią globalnej społeczności data scientist Lidla i będziesz mógł wymieniać się pomysłami oraz doświadczeniem z ekspertami w dziedzinie Data Science z różnych krajów',
        'Wdrażanie rozwiązań międzynarodowych poprzez dostosowywanie ich do uwarunkowań lokalnych',
        'Tworzenie interaktywnych dashboardów dostarczających informacje na bazie zbudowanych algorytmów / modeli, pozwalających użytkownikom na analizy ad hoc',
      ],
    },
    competencies: {
      id: 'competencies-1',
      title: 'Wymagane kompetencje',
      items: [
        'Praca end-to-end nad modelami maszynowego uczenia (ML) - od konceptualizacji na podstawie wymagań biznesowych, poprzez przygotowanie danych, prototypowanie modelu do wdrożenia operacyjnego rozwiązania',
        'Monitorowanie wdrożonych modeli, analiza ich rezultatów oraz wprowadzanie usprawnień',
        'Wspieranie działów merytorycznych i kadry zarządzającej w podejmowaniu bieżących decyzji poprzez dostarczanie informacji opartych na analizie dużych zbiorów (np. poprzez tworzenie analiz "deep-dive" opartych na modelach statystycznych)',
        'Staniesz się częścią globalnej społeczności data scientist Lidla i będziesz mógł wymieniać się pomysłami oraz doświadczeniem z ekspertami w dziedzinie Data Science z różnych krajów',
        'Wdrażanie rozwiązań międzynarodowych poprzez dostosowywanie ich do uwarunkowań lokalnych',
        'Tworzenie interaktywnych dashboardów dostarczających informacje na bazie zbudowanych algorytmów / modeli, pozwalających użytkownikom na analizy ad hoc',
      ],
    },
    benefits: {
      id: 'benefits-1',
      title: 'Benefity dla Ciebie',
      items: [
        'Praca end-to-end nad modelami maszynowego uczenia (ML) - od konceptualizacji na podstawie wymagań biznesowych, poprzez przygotowanie danych, prototypowanie modelu do wdrożenia operacyjnego rozwiązania',
        'Monitorowanie wdrożonych modeli, analiza ich rezultatów oraz wprowadzanie usprawnień',
        'Wspieranie działów merytorycznych i kadry zarządzającej w podejmowaniu bieżących decyzji poprzez dostarczanie informacji opartych na analizie dużych zbiorów (np. poprzez tworzenie analiz "deep-dive" opartych na modelach statystycznych)',
        'Staniesz się częścią globalnej społeczności data scientist Lidla i będziesz mógł wymieniać się pomysłami oraz doświadczeniem z ekspertami w dziedzinie Data Science z różnych krajów',
        'Wdrażanie rozwiązań międzynarodowych poprzez dostosowywanie ich do uwarunkowań lokalnych',
        'Tworzenie interaktywnych dashboardów dostarczających informacje na bazie zbudowanych algorytmów / modeli, pozwalających użytkownikom na analizy ad hoc',
      ],
    },
    skills: {
      id: 'skills-1',
      skills: ['data science', 'machine learning', 'analiza', 'statystyka', 'angielski C1', 'praca w zespole'],
    },
    location: {
      id: 'location-1',
      address: 'Kerkstraat, Amsterdam, Netherlands',
      latitude: 52.3676,
      longitude: 4.9041,
    },
  });
}
