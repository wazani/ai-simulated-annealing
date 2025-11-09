# 1. Create Item objects
#app start point and testing area
import math
import random
from problem_representation.bag_state import BagState
from problem_representation.item import Item
from problem_representation.bag import Bag
from simulated_annealing.simulated_annealing import simulated_annealing


book = Item('book',weight=2, value=10)
laptop = Item('laptop',weight=6, value=150)
snack = Item('snack',weight=2, value=3)
stick1 = Item('stick 1',weight=1, value=1)
stick2 = Item('stick 2',weight=1, value=3)
stick3 = Item('stick 3',weight=1, value=3)
stick4 = Item('stick 4',weight=1, value=2)
stick5 = Item('stick 5',weight=1, value=1)
stick6 = Item('stick 6',weight=1, value=1)

allItems = [book, laptop, snack,stick1,stick2,stick3,stick4,stick5,stick6]
bag = Bag(capacity=11)

#bag.add_item(book)
#bag.add_item(laptop)
#bag.add_item(snack)

#initial_state = BagState(bag, allItems)

#print(bag)

bagState = BagState(bag,allItems)
best=simulated_annealing(bagState)
print(best)
#print(math.exp(-0.5))
#print(f"Total Weight: {bag.get_weight()}")
