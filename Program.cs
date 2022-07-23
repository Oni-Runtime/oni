// See https://aka.ms/new-console-template for more information
using Microsoft.ClearScript.V8;

internal class Program
{
    private static void LoadFile(string fileName)
    {
        var script = File.ReadAllText(fileName);
        var engine = new V8ScriptEngine();
        engine.Execute(script);
    }
    private static void Main(string[] args)
    {
        using (var engine = new V8ScriptEngine())
        {
            engine.AddHostType("Console", typeof(Console));
            // engine.Execute("Console.WriteLine('Hello world!');");

            bool kill = false;

            while (!kill)
            {
                Console.Write("> ");
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
}