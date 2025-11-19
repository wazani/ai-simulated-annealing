from problem_representation.item import Item


class Bag:
    """
    This class represents a Knapsack bag, it will contain a list of Item objects and a weight capacity.
    """

    def __init__(self, capacity: int):
        self.capacity: int = capacity
        self.items: list[Item] = []
        self.total_weight: int = 0
        self.total_value: int = 0

    def add_item(self, item: Item) -> None:
        self.items.append(item)
        self.total_weight += item.weight
        self.total_value += item.value

    def remove_item(self, item: Item) -> None:
        self.items.remove(item)
        self.total_weight -= item.weight
        self.total_value -= item.value

    def get_weight(self) -> int:
        return self.total_weight
        # return sum(item.weight for item in self.items)

    def get_value(self) -> int:
        return self.total_value
        # return sum(item.value for item in self.items)

    @classmethod
    def copy(cls, bag: "Bag") -> "Bag":
        new_bag = Bag(bag.capacity)
        new_bag.items = [] + bag.items
        new_bag.total_value = int(bag.total_value)
        new_bag.total_weight = int(bag.total_weight)
        return new_bag

    def __repr__(self) -> str:
        return (
            f"Bag(\n  Capacity: {self.capacity},\n  Weight: {self.get_weight()}, "
            f"\n  Value: {self.get_value()}, \n  Items: \n    {"\n    ".join(repr(item) for item in self.items)}\n)"
        )

    def __str__(self) -> str:
        return f"""{'{'}Capacity: {self.capacity},Weight: {self.get_weight()},Value: {self.get_value()},Items: \n    {"\n    ".join(str(item) for item in self.items)}{'}'}"""

    def json(self):
        return {
            "capacity": self.capacity,
            "weight": self.get_weight(),
            "value": self.get_value(),
            "items": list(map(lambda item: item.json(), self.items)),
        }
