from _decimal import *
PENCE = Decimal('.01')

def get_cash_register():
    with open('./cash-register.txt') as file:
        cash_register_data = file.read().splitlines()
        cash_register = []
        for data in cash_register_data:
            splitData = data.replace(' ', '').replace('Â', '').split('x')
            cash_register.append([Decimal(splitData[1][1:]) if splitData[1].startswith('£') else Decimal(splitData[1][0: -1]) / 100, int(splitData[0])])
    return cash_register

def get_change_required(transaction, cash_provided):
    return Decimal(cash_provided).quantize(PENCE, ROUND_HALF_UP) - Decimal(transaction).quantize(PENCE, ROUND_HALF_UP)

def format_change_data(change):
    formattedChange = {}
    for denomination in change:
        formattedChange[f'£{int(denomination)}' if denomination >= 1 else f'{int(denomination * 100)}p'] = change[denomination]
    return formattedChange

def get_most_efficient_change(change_required, cash_register):
    current_cash_index = 0
    initial_change = change_required
    change = {}
    
    while change_required != 0:
        if (current_cash_index == len(cash_register)):
            return f'Sorry! We appear to have run out of change. We\'ve given you {initial_change - change_required} we still owe you {change_required}. Would you accept a lollipop instead\?'

        denomination = cash_register[current_cash_index][0]
        denominationCount = cash_register[current_cash_index][1]
        if (change_required - denomination < 0):
            current_cash_index += 1
        elif (denominationCount <= 0):
            current_cash_index += 1
        else:
            change[denomination] = change[denomination] + 1 if denomination in change else 1
            cash_register[current_cash_index][1] -= 1
            change_required -= Decimal(denomination).quantize(PENCE, ROUND_HALF_UP)
    return change

print('Efficient change: ')
print(format_change_data(get_most_efficient_change(get_change_required(7.11, 10.0), get_cash_register())))
print(format_change_data(get_most_efficient_change(get_change_required(5.52, 7.0), get_cash_register())))
print(format_change_data(get_most_efficient_change(get_change_required(15.23, 20.0), get_cash_register())))
print(format_change_data(get_most_efficient_change(get_change_required(0.50, 5), get_cash_register())))
print(format_change_data(get_most_efficient_change(get_change_required(8.85, 10), get_cash_register())))

# Stretch Goal

def initalise_coins_used(cash_register):
    denominations = []
    for cash in cash_register:
        denominations.append([cash[0], 0])
    return denominations

def handle_last_change_item(change):
    last_change_denomination = list(change.items())[-1][0]
    last_change_item = change[last_change_denomination]
    last_change_item -= 1
    if last_change_item == 0:
        del change[last_change_denomination]
    return change

def get_least_efficient_change(change_required, cash_register): 
    current_cash_index = len(cash_register) - 1
    initial_change = change_required
    coins_used = initalise_coins_used(cash_register)
    change = {}
    
    while change_required != 0:
        if (current_cash_index == len(cash_register)):
            return f'Sorry! We appear to have run out of change. We\'ve given you {initial_change - change_required} we still owe you {change_required}. Would you accept a lollipop instead\?'

        denomination = cash_register[current_cash_index][0]
        denominationCount = cash_register[current_cash_index][1]
        if (denominationCount <= 0):
            current_cash_index -= 1
        else:
            change[denomination] = change[denomination] + 1 if denomination in change else 1
            cash_register[current_cash_index][1] -= 1
            change_required -= Decimal(denomination).quantize(PENCE, ROUND_HALF_UP)
            coins_used[current_cash_index][1] += 1

        if change_required < 0:
            leftovers = get_most_efficient_change(-change_required, coins_used)
            for key in leftovers:
                change[key] = change[key] - leftovers[key]
                change_required += (leftovers[key] * key)
       
    change = handle_last_change_item(change)
    return change

print()
print()
print('Inefficient change: ')
print(format_change_data(get_least_efficient_change(get_change_required(7.11, 10.0), get_cash_register())))
print(format_change_data(get_least_efficient_change(get_change_required(5.52, 7.0), get_cash_register())))
print(format_change_data(get_least_efficient_change(get_change_required(15.23, 20.0), get_cash_register())))
print(format_change_data(get_least_efficient_change(get_change_required(0.50, 5), get_cash_register())))
print(format_change_data(get_least_efficient_change(get_change_required(8.85, 10), get_cash_register())))