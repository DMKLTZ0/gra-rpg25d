### Model Pracy nad Projektem: Gra RPG 2.5D

Ten dokument opisuje cykl pracy i zasady, których będziemy przestrzegać podczas każdej sesji deweloperskiej.

#### 1. Schemat Rozpoczęcia Sesji Pracy

Każdą nową sesję (w nowej konwersacji) rozpoczynamy od fazy **"Synchronizacji Stanu"**:

1.  **Moje Powitanie i Analiza:** Na początku każdej sesji automatycznie:
    *   Przeczytam plik `PROJECT_LOG.md`, aby zidentyfikować, na czym skończyliśmy i jaki jest następny zaplanowany krok w "Mapie Drogowej".
    *   Uruchomię komendę `git status`, aby upewnić się, że nie ma żadnych niezatwierdzonych zmian z poprzedniej sesji.
2.  **Raport Otwarcia:** Przedstawię Ci krótkie podsumowanie: "Dzień dobry! Zgodnie z `PROJECT_LOG.md`, ostatnio zakończyliśmy [opis zadania]. Następnym celem jest [cel z Mapy Drogowej]. Repozytorium jest czyste. Czy jesteś gotów, aby kontynuować?"
3.  **Twoja Decyzja:** Po Twoim potwierdzeniu przystępujemy do pracy.

#### 2. Schemat Realizacji i Rozbudowy Projektu

Praca nad nowymi funkcjami lub zmianami będzie przebiegać w pętli **"Plan -> Realizacja -> Test"**:

1.  **Definicja Celu:** Mówisz mi, co chcesz osiągnąć (np. "Zróbmy system questów" lub "Poprawmy wygląd ekwipunku").
2.  **Propozycja Planu:** Ja dzielę zadanie na mniejsze, logiczne kroki (np. "1. Utworzę plik `Quests.js`. 2. Dodam logikę do `useGameLogic.js`. 3. Wyświetlę aktywne questy w HUD."). Przedstawię Ci ten plan.
3.  **Realizacja Krok po Kroku:** Po Twojej akceptacji realizuję plan krok po kroku, informując Cię o postępach i używając narzędzi do modyfikacji kodu.
4.  **Cykliczne Testowanie:** Po zaimplementowaniu istotnego fragmentu (np. nowego komponentu) proponuję szybki test: "Dodałem podstawy systemu questów. Czy chcesz, abym uruchomił serwer (`npm start`), żebyśmy mogli zobaczyć, jak to wygląda?".

#### 3. Schemat Planowania Dalszej Pracy

Planowanie jest integralną częścią procesu, realizowaną poprzez **ciągłą aktualizację "Mapy Drogowej"**:

1.  **Dyskusja o Priorytetach:** Po zakończeniu większego zadania lub na Twoją prośbę, możemy omówić, co robić dalej.
2.  **Aktualizacja Mapy Drogowej:** Na podstawie naszej dyskusji, zaktualizuję sekcję `🚀 Mapa Drogowa (Roadmap)` w pliku `PROJECT_LOG.md`. Przesunę ukończone zadania i ustalę nowy "Następny krok".

#### 4. Schemat Zakończenia Sesji Pracy

Każdą sesję kończymy procedurą **"Czystego Zamknięcia"**, aby przygotować projekt na przyszłość:

1.  **Twoja Decyzja o Zakończeniu:** Informujesz mnie: "Na dziś wystarczy" lub "Zakończmy na razie pracę".
2.  **Finalny Test:** Zaproponuję ostatni test, aby upewnić się, że projekt jest w stabilnym, działającym stanie (`npm start` lub `npm run build`).
3.  **Aktualizacja Dziennika:** Po pomyślnym teście zaktualizuję `PROJECT_LOG.md`, dodając nowy wpis do `📝 Dziennik Zmian (Changelog)` z podsumowaniem pracy wykonanej podczas sesji.
4.  **Zatwierdzenie i Synchronizacja Git:** Wykonam sekwencję komend:
    *   `git add .`
    *   `git commit -m "feat/fix/docs: Krótkie podsumowanie zmian z sesji"`
    *   `git push`
5.  **Potwierdzenie Zakończenia:** Na koniec poinformuję: "Procedura zamknięcia zakończona. Projekt został zaktualizowany, a wszystkie zmiany wysłane do repozytorium. Jesteśmy gotowi na następną sesję. Do zobaczenia!".