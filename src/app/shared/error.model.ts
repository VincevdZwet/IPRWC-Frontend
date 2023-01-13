export class ErrorModel {
  static errorMap = new Map<string, string>([
      ["INVALID_CREDENTIALS", "Invalid credentials"],
      ['EMAIL_EXISTS', 'This email already exists'],
      ['USER_DISABLED', 'User is not enabled'],
      ['PRODUCT_NOT_FOUND', 'Product not found'],
      ['USER_NOT_FOUND', 'User not found'],
    ]
  )
}
