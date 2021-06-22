from _decimal import *

def get_cash_register():
    with open('./cash-register.txt') as file:
        cash_register_data = file.read().splitlines()
        cash_register = []
        for data in cash_register_data:
            splitData = data.replace(' ', '').replace('Â', '').split('x')
            cash_register.append([Decimal(splitData[1][1:]) if splitData[1].startswith('£') else Decimal(splitData[1][0: -1]) / 100, int(splitData[0])])
    return cash_register

def get_most_efficient_change(transaction, cash_provided):
    pence = Decimal('.01')
    change_required = Decimal(cash_provided).quantize(pence, ROUND_HALF_UP) - Decimal(transaction).quantize(pence, ROUND_HALF_UP)
    cash_register = get_cash_register()
    current_cash_index = 0
    dialogue = 'Here you are: '
    change = {}
    
    while change_required != 0:
        if (current_cash_index == len(cash_register)):
            dialogue = 'Sorry! We appear to have run out of change. Would you accept a lollipop as recompense?'
            break

        denomination = cash_register[current_cash_index][0]
        denominationCount = cash_register[current_cash_index][1]
        if (change_required - denomination < 0):
            current_cash_index += 1
        elif (denominationCount <= 0):
            current_cash_index += 1
        else:
            change[denomination] = change[denomination] + 1 if denomination in change else 1
            cash_register[current_cash_index][1] -= 1
            change_required -= Decimal(denomination).quantize(pence, ROUND_HALF_UP)

    if (dialogue == 'Here you are: '):
        for key in change:
            stringifyDenomination = f'£{int(key)}s' if key >= 1 else f'{int(key*100)} pence'
            dialogue += f'{change[key]} x {stringifyDenomination}, ' 

    return dialogue[:-2]

print(get_most_efficient_change(7.11, 10.0))
print(get_most_efficient_change(5.52, 7.0))
print(get_most_efficient_change(15.23, 20.0))
print(get_most_efficient_change(0.50, 5))
print(get_most_efficient_change(8.85, 10))