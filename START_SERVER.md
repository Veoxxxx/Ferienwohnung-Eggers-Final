# ANLEITUNG: Dev-Server starten

Da PowerShell Execution Policy Probleme hat, verwenden Sie bitte eine der folgenden Methoden:

## Option 1: CMD verwenden (EMPFOHLEN)

1. Öffnen Sie eine **Command Prompt** (cmd.exe)
2. Navigieren Sie zum Projektverzeichnis:

   ```cmd
   cd C:\Users\Swenb\Documents\Projekte
   ```

3. Starten Sie den Dev-Server:

   ```cmd
   npm run dev
   ```

## Option 2: PowerShell Execution Policy ändern

1. Öffnen Sie PowerShell **als Administrator**
2. Führen Sie aus:

   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Dann normal:

   ```powershell
   cd C:\Users\Swenb\Documents\Projekte
   npm run dev
   ```

## Nach dem Start

- Server läuft auf: `http://localhost:3000`
- Drücken Sie im Browser: **Ctrl+Shift+R** (Hard Reload)
- Die Bilder sollten jetzt sichtbar sein!

## Hinweis

Ich habe gerade den `.next` Build-Cache gelöscht, damit Next.js die neuen `.png` Dateien erkennt.
