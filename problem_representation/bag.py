from problem_representation.item import Item


class Bag:
    """
    This class represents a Knapsack bag, it will contain a list of Item objects and a weight capacity.
    """
    
    def __init__(self, capacity: int, items: list[Item]=[]):
        self.capacity: int = capacity        
        self.items: list[Item] = items

    def add_item(self, item: Item) -> None:
        self.items.append(item)

    def get_weight(self) -> int:
        return sum(item.weight for item in self.items)

    def get_value(self) -> int:
        return sum(item.value for item in self.items)

    def __repr__(self) -> str:
        return (
            f"Bag(\n  Capacity: {self.capacity},\n  Weight: {self.get_weight()}, "
            f"\n  Value: {self.get_value()}, \n  Items: \n    {"\n    ".join(repr(item) for item in self.items)}\n)"
        )
    
    def __str__(self) -> str:
        return (f"""{'{'}Capacity: {self.capacity},Weight: {self.get_weight()},Value: {self.get_value()},Items: \n    {"\n    ".join(str(item) for item in self.items)}{'}'}""")
    
    def json(self):
        return {"capacity": self.capacity,
                "weight": self.get_weight(),
                "value": self.get_value(),
                "items": list(map(lambda item: item.json(),self.items))}