class Item:
    """
    This class represents an item with a specific label, weight and value.
    It will represent a single item added to the Knapsack bag
    """
    
    def __init__(self, label:str, weight:int, value:int):        
        self.label: str = label
        self.weight: int = weight
        self.value: int = value
        
    def __repr__(self):
        return f"Item(L: {self.label}, W: {self.weight}, V: {self.value})"
    
    def __str__(self) -> str:
        return (f"""{'{'}label: {self.label},weight: {self.weight},value: {self.value}{'}'}""")
    
    def json(self):
        return {"label": self.label, "weight": self.weight, "value": self.value}
