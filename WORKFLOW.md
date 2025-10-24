### Model Pracy nad Projektem: Gra RPG 2.5D

Ten dokument opisuje cykl pracy i zasady, których będziemy przestrzegać podczas każdej sesji deweloperskiej.

#### 1. Schemat Rozpoczęcia Sesji Pracy

Każdą nową sesję rozpoczynamy od fazy **"Synchronizacji Stanu"**:

1.  **Analiza Automatyczna:** Na początku każdej sesji automatycznie:
    *   Przeczytam plik `PROJECT_LOG.md`, aby zidentyfikować następny zaplanowany krok.
    *   Sprawdzę status Git (`git status`), aby upewnić się, że gałąź `main` jest czysta.
2.  **Raport Otwarcia:** Przedstawię Ci krótkie podsumowanie z prośbą o zdefiniowanie celu na bieżącą sesję.
3.  **Tworzenie Gałęzi Funkcyjnej (Feature Branch):** Po ustaleniu celu (np. "Implementacja systemu questów"), stworzę nową gałąź dedykowaną tej funkcji, np. `feature/quest-system`, i przełączę się na nią. Cała praca w danej sesji będzie odbywać się na tej gałęzi.

#### 2. Schemat Realizacji i Rozbudowy Projektu

Praca nad funkcjami przebiega w pętli **"Plan -> Realizacja -> Test -> Poprawka"**:

1.  **Definicja Celu i Plan Działania:** Na podstawie Twoich wytycznych, dzielę zadanie na mniejsze, logiczne kroki i przedstawiam Ci plan do akceptacji.
2.  **Realizacja Krok po Kroku:** Realizuję zaakceptowany plan, modyfikując kod i informując o postępach.
3.  **Cykliczne Testowanie:** Regularnie proponuję uruchomienie projektu, aby na bieżąco weryfikować poprawność działania wprowadzonych zmian.
4.  **Protokół Postępowania w Razie Błędów:** W przypadku napotkania błędu:
    *   **Identyfikacja:** Zatrzymuję pracę, cytuję komunikat błędu i analizuję ostatnie zmiany.
    *   **Diagnoza:** Przedstawiam hipotezę dotyczącą przyczyny problemu.
    *   **Plan Naprawczy:** Proponuję konkretne kroki w celu rozwiązania błędu.
    *   **Weryfikacja:** Po wdrożeniu poprawki, ponownie przeprowadzamy test.

#### 3. Standardy i Jakość Kodu

1.  **Automatyczne Formatowanie:** Projekt jest wyposażony w narzędzie `Prettier`. Przed każdym zatwierdzeniem zmian (commit), uruchomię skrypt `npm run format`, który automatycznie sformatuje kod, zapewniając jego spójność i czytelność.

#### 4. Schemat Zakończenia Sesji Pracy

Każdą sesję kończymy procedurą **"Integracji i Czystego Zamknięcia"**:

1.  **Twoja Decyzja o Zakończeniu:** Informujesz mnie, że na dziś kończymy.
2.  **Finalne Formatowanie i Test:** Uruchamiam `npm run format`, a następnie przeprowadzam finalny test, aby upewnić się, że kod na gałęzi funkcyjnej jest stabilny.
3.  **Integracja z Gałęzią Główną (Merge):**
    *   Przełączam się na gałąź `main`.
    *   Łączę zmiany z naszej gałęzi funkcyjnej (`git merge feature/nazwa-funkcji`).
    *   Usuwam gałąź funkcyjną, która nie jest już potrzebna (`git branch -d feature/nazwa-funkcji`).
4.  **Aktualizacja Dziennika:** Aktualizuję `PROJECT_LOG.md`, dodając wpis o zrealizowanych zadaniach do `Changelog` i ewentualnie aktualizując `Roadmap`.
5.  **Zatwierdzenie i Synchronizacja Git:** Wysyłam wszystkie zmiany z lokalnej gałęzi `main` do zdalnego repozytorium na GitHub (`git push`).
6.  **Potwierdzenie Zakończenia:** Informuję o pomyślnym zakończeniu procedury, potwierdzając, że gałąź `main` jest stabilna, aktualna i gotowa na następną sesję.