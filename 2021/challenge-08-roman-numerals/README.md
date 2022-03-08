# Challenge VIII

My solution for challenge VIII, with main challenge and stretch goal completed. I was a bit confused on what subtractive notation was exactly, my take was:

* I can be placed before V (5) and X (10) to make 4 and 9.
* X can be placed before L (50) and C (100) to make 40 and 90.
* C can be placed before D (500) and M (1000) to make 400 and 900.

Otherwise, use additive notation. So IIX != 8, use VIII instead.

## How to Run

Open solution.py in the challenge-8-roman-numerals folder in VS Code (or any other Python IDE) and run the program, the solution will appear in the console. 

### The Challenge

For the purposes of this challenge, a Roman numeral is a string of characters in the set M,D,C,L,X,V,I  where each has a value of 1000,500,100,50,10,5,1 respectively. Given any two Roman numerals in additive notation*, your task is to write an algorithm which can determine whether the first is less than the second, without using any built-in language features which are capable of decoding Roman numerals (such as Excel’s ROMAN() function)
* Additive notation refers to a numeral where each character is simply added together to give the final value. There is also a subtractive notation where 9, for example, would be written as IX rather than VIIII . Full details of each notation can be found on Wikipedia
:five:  Points are awarded for a working solution  
:five:  Points are awarded for an algorithm which also supports subtractive notation  

### Example:
Given the following problem:
compare('VI', 'MMMCXI')
The expected output is:
true