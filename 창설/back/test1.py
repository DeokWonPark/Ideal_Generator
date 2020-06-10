import math
import sys
def dist(p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

xarr = [20,3]
yarr = [20,14]
dist = dist(xarr, yarr)
print("The shortest distance is", dist)