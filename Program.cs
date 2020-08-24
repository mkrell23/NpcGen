using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.IO;
using System.Collections.Generic;

namespace NpcGen
{
    class Program
    {
        static void Main(string[] args)
        {
            var path = (Directory.GetCurrentDirectory() + "\\Data\\");
            
            var classes = new List<Classes>();
            
            var serializer = new JsonSerializer();

            using (var reader = new StreamReader(path + "Classes.json"))
            using (var jsonReader = new JsonTextReader(reader))
            {
                 classes = serializer.Deserialize<List<Classes>>(jsonReader);
            }

            Console.WriteLine("Hello World!");
            Console.ReadKey();
        }
    }
}
