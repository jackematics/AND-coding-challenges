CALCULATOR_FONT_CONVERSION = {
  0: ' _ | ||_|',
  1: '     |  |',
  2: ' _  _||_ ',
  3: ' _  _| _| ',
  4: '   |_|  |',
  5: ' _ |_  _|',
  6: ' _ |_ |_|',
  7: ' _   |  |',
  8: ' _ |_||_|',
  9: ' _ |_| _|'
}

def print_calculator_font(number_as_string):
  for i in range(0, len(CALCULATOR_FONT_CONVERSION[0]), 3):
    print_character_layers(number_as_string, [i, i + 1, i + 2])

def print_character_layers(number_as_string, font_character_indexes):
  for i in range(0, len(number_as_string)):
    current_character = int(number_as_string[i])
    number_to_convert = CALCULATOR_FONT_CONVERSION[current_character]
    print_character_layer(number_to_convert, font_character_indexes)
  print()

def print_character_layer(number_to_convert, font_character_indexes):
  for j in range(0, len(font_character_indexes)):
    font_character = number_to_convert[font_character_indexes[j]]
    print(font_character, end = '')
  
print_calculator_font("0123456789")
print_calculator_font("80345670139476509134875")