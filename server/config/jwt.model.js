module.exports = {
  jwt: {
    secret: 'myapp',
    tokens: {
      access: {
        type: 'access',
        expiresIn: 120
      },
      refresh: {
        type: 'refresh',
        expiresIn: 600
      }
    }
  }
}