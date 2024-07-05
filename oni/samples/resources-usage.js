// oni.js
Console.WriteLine("Hello from JavaScript!");

var now = DateTime.Now;
Console.WriteLine("Current Date and Time: " + now.ToString());

// Create a list of strings
var list = ListHelper.Create("System.String");
list.Add("Item 1");
list.Add("Item 2");
Console.WriteLine("List count: " + list.Count);

// Create a dictionary with string keys and object values
var dict = DictionaryHelper.Create("System.String", "System.Object");
dict.Add("key1", "value1");
dict.Add("key2", 123);

// Convert dictionary to dynamic object
var dictObj = Oni.convertToDynamicObject(dict);

for (var key in dictObj) {
    Console.WriteLine(key + ": " + dictObj[key]);
}

var random = new Random();
var randomValue = random.Next(1, 100);
Console.WriteLine("Random value: " + randomValue);
