##Players.py opens a file and reads all lines in following format:
##XXX batted # times with # hits and # runs  
##and prints a sorted list of players' batting average.

import sys, operator
import re #regular expression

#To read and parse an input file concerning game data.
def readFile(inputFile):
    #player data    
    players = {}
    times = {}
    hits = {}
    #matching rules
    valid_regex = re.compile(r"[A-Z][A-Za-z]+ [A-Z][A-Za-z]+ batted \d+ times with \d+ hits and \d+ runs")
    name_regex = re.compile(r"[A-Z][A-Za-z]+ [A-Z][A-Za-z]+")
    number_regex = re.compile(r"\d+")
    
    try:
        file = open(inputFile, 'r')
        for line in file:
            #validate format
            valid = valid_regex.match(line)
            if valid is not None:
                #extract characters
                player = name_regex.match(line).group(0)
                number = number_regex.findall(line)
                time=int(number[0])
                hit=int(number[1])
                #populate data
                if player in times:
                    times[player] += time
                    hits[player] += hit
                else:
                    times[player] = time
                    hits[player] = hit
    except IOError:
        sys.exit("IOE Error: Fail to open %s !" % inputFile)
    else:
        file.close()
        #calculate batting average
        for player, hit in hits.items():
            players[player] = hit / times[player] 
        return players.items()

#To sort and print a list in designated format.
def printList(players, ifDescending = True):
    sortedPlayers = sorted(players, key=operator.itemgetter(1), reverse=ifDescending)
    for player in sortedPlayers:
        print("{0}: {1:.3f}".format(player[0], player[1]))

#main        
if __name__ == "__main__":
    
    if len(sys.argv) < 2:
        sys.exit("Usage: %s requires at least one argument for input file name! " % sys.argv[0])

    inputFile = sys.argv[1]
    players=readFile(inputFile)
    printList(players)
