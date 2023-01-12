export class ErrorModel {
  static errorMap = new Map<string, string>([
      ["SET_PASSWORD_NOT_ALLOWED", "Je hebt geen toegang om een wachtwoord te zetten, gebruik 'change-password' endpoint"],
      ["INVALID_CREDENTIALS", "Ongeldige inloggegevens"],
      ['EMAIL_EXISTS', 'Dit e-mail adres is al gebruikt'],
      ['INTERNAL_SERVER_ERROR', 'Er is een interne serverfout opgetreden'],
      ['USER_DISABLED', 'Gebruiker is niet aangezet'],
      ['RESET_PASSWORD', 'Wachtwoord moet opnieuw worden ingesteld'],
      ['INVALID_CREDENTIALS', 'Ongeldige inloggegevens'],
      ['TOKEN_EXISTS', 'Je hebt al een token'],
      ['ENTRY_NOT_FOUND', 'De entry is niet gevonden'],
      ['USER_NOT_FOUND', 'De gebruiker is niet gevonden'],
      ['EMAIL_NOT_FOUND', 'Het e-mail adres is niet gevonden'],
      ['TOKEN_NOT_FOUND', 'De token is niet gevonden'],
      ['QUESTIONNAIRE_NOT_FOUND', 'De vragenlijst is niet gevonden'],
      ['NO_ENTRIES_FOR_QUESTIONAIRE', 'Er zijn geen entries gevonden voor deze vragenlijst']
    ]
  )
}
