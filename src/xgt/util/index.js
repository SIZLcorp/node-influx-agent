
function printHEXPretty (str) {
  if (!str) {
    return ''
  }
  return str.toString('hex').match(/.{2}/g)?.join(' ')
}

module.exports = {
  printHEXPretty
}