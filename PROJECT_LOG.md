
# Mobile RPG - Dziennik Projektu

**Cel projektu:** Stworzenie prostej, ale wciągającej gry RPG, zoptymalizowanej pod kątem urządzeń mobilnych. Gra ma oferować eksplorację, walkę, rozwój postaci i system zadań.

**Jak grać:** Steruj postacią za pomocą przycisków kierunkowych. Atakuj najbliższych wrogów przyciskiem ataku. Zbieraj przedmioty, wykonuj zadania i rozwijaj swoją postać.

## ✅ Stan obecny: Zaimplementowane Funkcje

- **Konfiguracja Projektu:**
    - [x] Skonfigurowany projekt React (`package.json`).
    - [x] Zainstalowane wszystkie niezbędne zależności.
    - [x] Możliwość uruchomienia serwera deweloperskiego (`npm start`).
- **Core Gameplay:**
    - [x] Poruszanie się postaci po mapie w 4 kierunkach.
    - [x] Płynne animacje ruchu postaci.
    - [x] System kamery podążającej za graczem.
    - [x] Kolizje z obiektami na mapie (drzewa, skały).
- **Walka:**
    - [x] Atak wręcz i na dystans (łuk, magia).
    - [x] System obrażeń i punktów życia (HP).
    - [x] Prosta AI przeciwników (podążanie za graczem, atak).
    - [x] Różne typy przeciwników z odmiennymi statystykami.
    - [x] Otrzymywanie obrażeń od przeciwników.
    - [x] Śmierć gracza i ekran "Game Over" z opcją restartu.
- **Postać i Ekwipunek:**
    - [x] System poziomów i doświadczenia (XP).
    - [x] Zdobywanie złota.
    - [x] Podstawowe statystyki postaci (siła, obrona, zasięg).
    - [x] Podnoszenie przedmiotów z mapy.
    - [x] Ekwipunek z możliwością zakładania i zdejmowania przedmiotów.
    - [x] Różne rodzaje ekwipunku (broń, zbroja).
    - [x] Przedmioty użytkowe (np. mikstury leczące).
- **Świat Gry:**
    - [x] System wielu map z portalami do przechodzenia między nimi.
    - [x] Losowe odradzanie się (respawn) przeciwników.
- **Interfejs Użytkownika (UI):**
    - [x] Wyświetlacz HUD (HP, XP, Poziom, Złoto, statystyki).
    - [x] Interfejs ekwipunku.
    - [x] Przyciski sterujące na ekranie.
    - [x] Wyświetlanie komunikatów (np. podniesienie przedmiotu, zdobycie złota).
- **Struktura Kodu i Procesy:**
    - [x] Zrefaktoryzowany kod z podziałem na komponenty.
    - [x] Centralna logika gry w hooku `useGameLogic`.
    - [x] Zdefiniowany i wdrożony `WORKFLOW.md` (gałęzie funkcyjne, standardy kodu, protokół błędów).
    - [x] Skonfigurowany `Prettier` do automatycznego formatowania kodu.

## 📝 Dziennik Zmian (Changelog)

**2024-07-28: Usprawnienie procesu deweloperskiego**
- **Opis:** Wprowadzono znaczące ulepszenia do naszego workflow w celu zwiększenia jakości kodu, bezpieczeństwa i efektywności. Zaktualizowano dokumentację procesową i zintegrowano nowe narzędzia.
- **Zmiany:**
    - Zaktualizowano `WORKFLOW.md`, wprowadzając zasady pracy na gałęziach funkcyjnych (feature branches), formalny protokół postępowania w razie błędów oraz standardy jakości kodu.
    - Zainstalowano i skonfigurowano `Prettier` jako narzędzie do automatycznego formatowania kodu.
    - Dodano skrypt `npm run format` do `package.json` w celu łatwego uruchamiania formatowania.
    - Przesformatowano cały istniejący kod w projekcie zgodnie z nowymi standardami.

**2024-07-27: Inicjalizacja projektu i naprawa środowiska deweloperskiego**
- **Opis:** Zdiagnozowano i rozwiązano problem uniemożliwiający uruchomienie projektu. Brakujący plik `package.json` został utworzony ręcznie, a następnie zainstalowano wszystkie niezbędne zależności, przekształcając projekt w pełnoprawną aplikację React.
- **Zmiany:**
    - Dodano plik `package.json` z konfiguracją projektu i listą zależności.

**2024-07-26: Refaktoryzacja kodu i nowa struktura projektu**
- **Opis:** Przeprowadzono gruntowną refaktoryzację kodu w celu zwiększenia jego czytelności, skalowalności i łatwości w utrzymaniu.
- **Zmiany:**
    - Cała logika gry została przeniesiona do hooka `useGameLogic.js`.
    - Utworzono dedykowane komponenty i pliki CSS.

## 🚀 Mapa Drogowa (Roadmap)

### Następny krok:
- [ ] Implementacja systemu questów i postaci niezależnych (NPC).

### Dalsze plany:
- [ ] Rozbudowa systemu walki (umiejętności specjalne, tury).
- [ ] Bardziej zaawansowana AI przeciwników.
- [ ] System handlu z NPC.
- [ ] Zapisywanie stanu gry.
- [ ] Dźwięki i muzyka.