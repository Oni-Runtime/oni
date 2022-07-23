// See https://aka.ms/new-console-template for more information
using Microsoft.ClearScript.V8;

internal class Program
{
    private static V8ScriptEngine v8 = new V8ScriptEngine();
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

        engine.AddHostType("Console", typeof(Console));

        var initFilePath = System.IO.Directory.GetCurrentDirectory() + "/oni/core/oni.js";

        LoadFile(initFilePath);
    }
    private static void Main(string[] args)
    {
        if (args.Length == 0)
        {
            using (var engine = GetInstance())
            {
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
                            engine.Execute(line);
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e.Message);
                        }
                    }
                }
            }
        }
        else if (args.Length == 1)
        {
            using (var engine = GetInstance())
            {
                SetupDependencies();

                var inputFile = File.ReadAllText(System.IO.Directory.GetCurrentDirectory() + "/" + args[0]);

                engine.Execute(inputFile);
            }
        }
        else
        {
            Console.WriteLine("oni [script]");
        }
    }
}