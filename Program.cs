// See https://aka.ms/new-console-template for more information
using Microsoft.ClearScript;
using Microsoft.ClearScript.JavaScript;
using Microsoft.ClearScript.V8;

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

        engine.AddHostType("Console", typeof(Console));
        engine.AddHostObject("mscorlib", new HostTypeCollection("mscorlib", "System.Core"));
        engine.AddHostObject("engine", engine);

        // engine.DocumentSettings.ContextCallback = (documentInfo) => {
        //     Console.WriteLine(documentInfo.Name);
        //     if (documentInfo.Name == "oni.js") {
        //         return new Dictionary<string, object> {
        //             { "engine", engine },
        //             { "File", typeof(File).ToHostType() },
        //             { "Directory", typeof(Directory).ToHostType() },
        //         };
        //     } else {
        //         return null;
        //     }
        // };

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
                            engine.Execute(line);
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