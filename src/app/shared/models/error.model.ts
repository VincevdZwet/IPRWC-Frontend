export class ErrorModel {
  static errorMap = new Map<string, string>([
      ["INVALID_CREDENTIALS", "Invalid credentials"],
      ['EMAIL_EXISTS', 'This email already exists'],
      ['PRODUCT_NOT_FOUND', 'Product not found'],
      ['USER_NOT_FOUND', 'User not found'],
      ['UNAUTHORIZED', "Unauthorized"],
      ['NOT_FOUND', 'Not Found'],
      ['TITLE_EXISTS', 'There is already a movie with that title'],
      ['INTERNAL_SERVER_ERROR', "Internal server error"],
      ['INVALID_BANK', 'The bank you chose is not available']
    ]
  )
}
