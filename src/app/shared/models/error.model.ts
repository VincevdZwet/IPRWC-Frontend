export class ErrorModel {
  static errorMap = new Map<string, string>([
      ["INVALID_CREDENTIALS", "Invalid credentials"],
      ['EMAIL_EXISTS', 'This email already exists'],
      ['PRODUCT_NOT_FOUND', 'Product not found'],
      ['USER_NOT_FOUND', 'User not found'],
      ['UNAUTHORIZED', "Unauthorized"],
      ['NOT_FOUND', 'Not Found'],
      ['TITLE_EXISTS', 'There is already a movie with that title'],
      ['PRODUCT_DETAILS_MISSING', 'We are missing some product details'],
      ['INTERNAL_SERVER_ERROR', "Internal server error"],
      ['INVALID_BANK', 'The bank you chose is not available'],
      ['PSWD_SHORT', 'Your chosen password is too short'],
      ['USER_DETAILS_MISSING', "We are missing some user details"],
      ['ORDER_DETAILS_MISSING', "We are missing some order details"]
    ]
  )
}
