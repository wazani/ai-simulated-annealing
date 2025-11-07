# 1. Create Item objects
#app start point and testing area
import random
from problem_representation.bag_state import BagState
from problem_representation.item import Item
from problem_representation.bag import Bag


book = Item('book',weight=2, value=10)
laptop = Item('laptop',weight=6, value=150)
snack = Item('snack',weight=1, value=5)
stick1 = Item('stick 1',weight=1, value=1)
stick2 = Item('stick 2',weight=1, value=1)

allItems = [book, laptop, snack, stick1, stick2]
bag = Bag(capacity=10)

bag.add_item(book)
bag.add_item(laptop)
bag.add_item(snack)

#initial_state = BagState(bag, allItems)

#print(bag)

bagState = BagState(bag,allItems)
nextState = bagState.random_successor()
print(bagState,nextState,nextState-bagState)
#print(f"Total Weight: {bag.get_weight()}")
