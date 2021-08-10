ROMAN_CHARACTERS = {
  'M': 1000,
  'D': 500,
  'C': 100,
  'L': 50,
  'X': 10,
  'V': 5,
  'I': 1
}

def compare(roman_numeral_a, roman_numeral_b, isAdditive):
  count_a = additive_notation_sum(roman_numeral_a) if isAdditive else subtractive_notation_sum(roman_numeral_a)
  count_b = additive_notation_sum(roman_numeral_b) if isAdditive else subtractive_notation_sum(roman_numeral_b)
  return count_a < count_b

def additive_notation_sum(roman_numeral):
  count = 0
  for numeral in roman_numeral:
    count += ROMAN_CHARACTERS[numeral]
  return count

def subtractive_notation_sum(roman_numeral):
  count = subtractionCount = 0
  for i in range(len(roman_numeral)):
    numeralValue = ROMAN_CHARACTERS[roman_numeral[i]]
    nextNumeralValue = ROMAN_CHARACTERS[roman_numeral[i + 1]] if i + 1 != len(roman_numeral) else None
    if (numeralValue == 1 and (nextNumeralValue == 5 or nextNumeralValue == 10)):
      subtractionCount += 1
    elif (numeralValue == 10 and (nextNumeralValue == 50 or nextNumeralValue == 100)):
      subtractionCount += 10
    elif (numeralValue == 100 and (nextNumeralValue == 500 or nextNumeralValue == 1000)):
      subtractionCount += 100
    else:
      count += (numeralValue - subtractionCount)
      subtractionCount = 0
  return count

print('Additive Notation')
print()

# Should be true
print('VI is less than MMMCXI: ' + str(compare('VI', 'MMMCXI', isAdditive = True))) # 6 is less than 3111
print('CCCCLX is less than D: ' + str(compare('CCCCLX', 'D', isAdditive = True))) # 460 is less than 500
print('XVI is less than XX: ' + str(compare('XVI', 'XX', isAdditive = True))) # 16 is less than 20
print()

# Should be false
print('MM is less than MD: ' + str(compare('MM', 'MD', isAdditive = True))) # 2000 is less than 1500
print('DLI is less than DL: ' + str(compare('DLI', 'DL', isAdditive = True))) # 551 is less than 550
print('MDCLXVI is less than CCCLXXXX: ' + str(compare('MDCLXVI', 'CCCLXXXX', isAdditive = True))) # 1666 is less than 390
print()
print()

print('Subtractive Notation')
print()

# Should be true
print('IV is less than V: ' + str(compare('IV', 'V', isAdditive = False))) # 4 is less than 5
print('CMCDXCXLIXIV is less than MD: ' + str(compare('CMCDXCXLIXIV', 'MD', isAdditive = False))) # 1443 is less than 1500
print('MMDXIV is less than MMDXX: ' + str(compare('MMDXIV', 'MMDXX', isAdditive = False))) # 2514 is less than 2520
print()

# Should be false
print('X is less than IX: ' + str(compare('X', 'IX', isAdditive = False))) # 10 is less than 9
print('XXIX is less than XXVIII: ' + str(compare('XXIX', 'XXVIII', isAdditive = False))) # 29 is less than 28
print('DC is less than DXC: ' + str(compare('DC', 'DXC', isAdditive = False))) # 600 is less than 590