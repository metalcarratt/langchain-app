# python

## STRINGS

len(string) - get length
string[0] - get char at
stiring.lower()
string.upper()
String * 3 (repeat three times)
str(number) - convert to string
‘{}’.format(‘hi’) - format with placeholders
‘{0} {1}’.format(‘1’, ‘2’)


## INPUT

input(‘prompt)
value = input(prompt)


## NUMBERS

int(num)
flaot(num)


## BOOLEANS

myvar = True

## CONDITIONS

and, or, not
Not 37 > 29
 
If 37 < 40:
	print(‘hi’)
elif 40 > 19:
	print(‘um’)
else:
	print(‘bye’)


## FUNCTIONS

def functionName():
	code
functionName()

def func(arg):
	print(arg)

def func(arg = ‘default’):
	print(arg)

def func(arg1, arg2):
	code
def(arg2=1, arg1=2) # named params

def func():
	“””doc string”””
help(func) # return “doc string”

def func():
	return 1


## LISTS

List = []
List = [‘hi, hi2’]
list[0] # ‘hi’
list[-2] # ‘hi’
list.append(‘two’)
list[-1] # last item on the list
list.extend([‘three’, ‘four’])
List.insert(0, ‘five’) # inserts item and moves all other items

### slice
list[0:1] # gets items 0-1 (only one)
list[1:] # all items from index 1
list[:2] # all items up to (not including) index 2
List[-2:0] # gets the last two items in the list

### slice on strings
‘horse’[1:3] # ‘or’

list.index(‘bear’) # index of first occurrence of ‘bear’

list3 = list1 + list2
len(list) # length of list

EXCEPTIONS

try:
	# do stuff
Except:
	# handle stuff


FOR LOOP

for item in list:
	# code
	print(item)


WHILE LOOP

while condition:
	# code



## SORTING

list.sort() # sorts the list and overwrites the variable
new_list = sorted(list) # sorts the list and assigns to a new variable


## RANGE

range(3) # [0,1,2]
For number in range(3):
	# will be 0, then 1, then 2
range(1,3) # [1,2] starts at 1, stops before 3
range(1, 10, 2) # start at 1, step by 2, stop before 10

For number in range(0, len(list), 2):
	print(list[number])) # prints 1st, 3rd, 5th item in the list, etc.


## DICTIONARY

map = {‘one’: 1, ‘two’: 2}
map = {
	‘one’: 1,
	‘two’: 2
}
map[‘one’]
map[’two’] = 3
map[‘three’] = 4
del map[‘two’]

If ‘one’ in list.keys(): # checks if ‘one’ is a key
2 in map.values() # checks if 2 is a value in the list

for key in map: # loops through all keys
for key, value in map.items() # loops through all (key, value) pairs


## TUPLES (an immutable list)

tuple = (1, 2, 3)
tuple = (1,) # if you want a tuple with one value it must contain a comma

del tuple # remove it

list = list(tuple)
tuple = tuple(list)
type(list) # <class ‘list’>
type(tuple) # <class ‘tuple’>

(one, two) = (‘two’, ‘one’) # one = ‘two’, two = ‘one’
(one, two) = [‘two’, ‘one’]
(one, two) = myFunc()


## FILES

open(path) # opens a file (absolute or relative) python understands forward slash and backslash on windows
file = open() # a file object
contents = file.read() # read the whole stream at once
print(contents)

file.seek(offset) # go to byte number of file
file.seek(0) # go to beginning of file
file.seek(5) # go to 5th byte
file.tell() # current position
flie.read(3) # three bytes

file.close() # close the file
file.closed # if file is closed or not

with open(path) as file:
	# code block
	# auto closes the file when the code block finished (even on exception)

for line in file:
	# do something with line

line.rstrip() # removes carriage return on end of string

### modes
open(path, ‘r’) # read, default mode
open(path, ‘w’) # write (truncating first - overwrite from 0)
open(path, ‘x’) # create new file and write
open(path, ‘a’) # append (creates if not exist)
open(path, ‘+’) # read/write
open(path, ‘rb’) # binary mode
open(path, ’rt’) # text mode (default)

file.mode # check mode

file.write(‘text’) # writes to file

\n # linux
\r\n # windows
file.write(‘text\n’) # linux style


## MODULES

```
Import time # imports time.py
time.func() # calls func on time
from module import func # import just one function
func()
from module import var1, var2

dir(time) # see contents of time module
sys.path # search path

PYTHONPATH=path1:path2 # linux environment var
PYTHONPATH=path1;path2 # windows environment var
```

when defining your own module just create a py file. If you import a py file the program will “execute”, which may not be what you want.
to make a module file have an internally executable code (run when you run the file, but not when you import it), use the following syntax:

```
If __name__ == ‘__main__’:
	# exec code
```