$words = File.readlines('words.txt').sort_by(&:length).reverse
$alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]

def get_longest_word(available_characters)
    unavailable_characters = $alphabet - available_characters
    for word in $words do
        if word.chars.intersection(unavailable_characters).length > 0
            next
        end
        return word
    end
    return "... actually no such word exists, whoops"
end

start = Time.now
puts "The longest word is #{get_longest_word(['a', 'e', 'i', 'o', 'u', 'y', 's', 't']).chomp()}."
finish = Time.now
puts "This code took #{finish - start} seconds to run."