import csv
from datetime import datetime

def get_presidents():
  with open('presidents.csv') as read_obj:
    return [{header: data for header, data in row.items()} for row in csv.DictReader(read_obj, skipinitialspace=True)]

def format_president_data(presidents, date_types):
  for i in range(len(date_types)):
    for president in presidents:
        president[date_types[i]] = president[date_types[i]].replace('July', 'Jul') if 'July' in president[date_types[i]] else president[date_types[i]]
        president[date_types[i]] = president[date_types[i]].replace('June', 'Jun') if 'June' in president[date_types[i]] else president[date_types[i]]
        president[date_types[i]] = datetime.strftime(datetime.now(), '%b %d %Y') if president[date_types[i]] == '' else president[date_types[i]]

  return presidents

def number_of_presidents_alive(year, presidents):
  count = 0
  for president in presidents:
    count += 1 if datetime.strptime(president['BIRTH DATE'], '%b %d %Y').year <= year <= datetime.strptime(president['DEATH DATE'], '%b %d %Y').year else 0
  
  return count
  
def get_years_with_most_presidents_alive():
  presidents = format_president_data(get_presidents(), ['BIRTH DATE', 'DEATH DATE'])
  longest_year = 1732
  most_presidents_count = 0
  present_year = datetime.now().year
  all_years = []

  for year in range(longest_year, present_year + 1):
    presidents_alive = number_of_presidents_alive(year, presidents)
    longest_year = year if presidents_alive > most_presidents_count else longest_year
    most_presidents_count = presidents_alive if presidents_alive > most_presidents_count else most_presidents_count

  for year in range(longest_year, present_year + 1):
    all_years.append(year) if number_of_presidents_alive(year, presidents) == most_presidents_count else ''
  
  return { 'most_presidents': most_presidents_count, 'years': all_years}

def print_years_with_most_presidents_alive():
  most_alive_years = get_years_with_most_presidents_alive()
  print(f'There were {most_alive_years["most_presidents"]} presidents alive in:')
  for year in most_alive_years['years']:
    print(year)

print_years_with_most_presidents_alive()