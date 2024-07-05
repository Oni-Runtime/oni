// See https://aka.ms/new-console-template for more information
using Microsoft.ClearScript;
using Microsoft.ClearScript.JavaScript;
using Microsoft.ClearScript.V8;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.JavaScript;

internal class Program
{
    private static V8ScriptEngine v8 = new V8ScriptEngine(V8ScriptEngineFlags.EnableDynamicModuleImports);
    private static V8ScriptEngine GetInstance() => v8;

    private static void LoadFile(string fileName)
    {
        var script = File.ReadAllText(fileName);
        var engine = GetInstance();
        engine.Execute(script);
    }

    private static void SetupDependencies()
    {
        var engine = GetInstance();

        // Add commonly used C# types to JavaScript
        engine.AddHostType("Console", typeof(Console));
        engine.AddHostObject("mscorlib", new HostTypeCollection("mscorlib", "System.Core", "System.Linq"));
        engine.AddHostObject("engine", engine);
        engine.AddHostType("Path", typeof(Path));
        engine.AddHostType("File", typeof(File));
        engine.AddHostType("Directory", typeof(Directory));
        engine.AddHostType("DateTime", typeof(DateTime));
        engine.AddHostType("Math", typeof(Math));
        engine.AddHostType("ListHelper", typeof(ListHelper));
        engine.AddHostType("DictionaryHelper", typeof(DictionaryHelper));
        engine.AddHostType("Converter", typeof(Converter));
        engine.AddHostType("Enumerable", typeof(Enumerable));
        engine.AddHostType("Environment", typeof(Environment));
        engine.AddHostType("Guid", typeof(Guid));
        engine.AddHostType("Random", typeof(Random));
        engine.AddHostType("Task", typeof(System.Threading.Tasks.Task));

        // Load initial JavaScript file
        var initFilePath = System.IO.Directory.GetCurrentDirectory() + "/oni/core/oni.js";
        LoadFile(initFilePath);
    }

    private static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            using (var engine = GetInstance())
            {
                engine.AddHostObject("args", args);

                SetupDependencies();

                bool kill = false;

                while (!kill)
                {
                    Console.Write("> ");

                    Console.CancelKeyPress += delegate {
                        kill = true;
                    };

                    var line = Console.ReadLine();
                    if (line == ".exit")
                    {
                        kill = true;
                    }
                    else
                    {
                        try
                        {
                            Console.WriteLine(engine.ExecuteCommand(line));
                        }
                        catch (Exception e)
                        {
                            Console.Error.WriteLine(e.Message);
                            Console.Error.WriteLine(e.StackTrace);
                        }
                    }
                }
            }
        }
        else if (args.Length >= 1)
        {
            using (var engine = GetInstance())
            {
                engine.AddHostObject("args", args);

                SetupDependencies();

                engine.DocumentSettings.AccessFlags = DocumentAccessFlags.EnableFileLoading;

                if (args.ToArray<string>().Contains("--test"))
                {
                    try
                    {
                        var inputFile = File.ReadAllText(System.IO.Directory.GetCurrentDirectory() + "/" + "oni/core/run-tests.js");
                        engine.Execute(new DocumentInfo { Category = ModuleCategory.Standard }, inputFile);
                    }
                    catch (Exception e)
                    {
                        Console.Error.WriteLine(e.Message);
                        Console.Error.WriteLine(e.StackTrace);
                    }
                }
                else
                {
                    try
                    {
                        var inputFile = File.ReadAllText(System.IO.Directory.GetCurrentDirectory() + "/" + args[0]);
                        engine.Execute(new DocumentInfo { Category = ModuleCategory.Standard }, inputFile);
                    }
                    catch (Exception e)
                    {
                        Console.Error.WriteLine(e.Message);
                        Console.Error.WriteLine(e.StackTrace);
                    }
                }
            }
        }
        else
        {
            Console.WriteLine("oni [script]");
        }
    }
}

public static class ListHelper
{
    public static IList Create(string typeName)
    {
        var type = Type.GetType(typeName) ?? throw new ArgumentException($"Type '{typeName}' not found");
        var listType = typeof(List<>).MakeGenericType(type);
        return (IList)Activator.CreateInstance(listType);
    }
}

public static class DictionaryHelper
{
    public static IDictionary Create(string keyTypeName, string valueTypeName)
    {
        var keyType = Type.GetType(keyTypeName) ?? throw new ArgumentException($"Key type '{keyTypeName}' not found");
        var valueType = Type.GetType(valueTypeName) ?? throw new ArgumentException($"Value type '{valueTypeName}' not found");
        var dictionaryType = typeof(Dictionary<,>).MakeGenericType(keyType, valueType);
        return (IDictionary)Activator.CreateInstance(dictionaryType);
    }
}

public static class Converter
{
    public static dynamic ConvertToDynamicObject(IDictionary dictionary)
    {
        var expando = (IDictionary<string, object>)new ExpandoObject();
        for (var i = 0; i < dictionary.Keys.Count; i++)
        {
            var key = dictionary.Keys.Cast<object>().ElementAt(i).ToString();
            var value = dictionary[key];
            expando[key] = value;
        }
        return expando;
    }

    public static bool IsCallable(object obj)
    {
        if (obj == null) return false;
        return obj is Delegate;
    }
}
