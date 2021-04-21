using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using Newtonsoft.Json;

namespace Application.Utils
{
    public class Params : Dictionary<string, string>
    {
        /// <summary>
        /// Initializes a new instance of the Params class.
        /// </summary>
        public Params()
        {
        }

        /// <summary>
        /// Initializes a new Param map with an initial key/value pair.
        /// </summary>
        /// <returns>the Param object, allowing for convenient chaining</returns>
        /// <param name="key">key the key for the parameter to send to the API</param>
        /// <param name="value">the value for the given key</param>
        public static Params With(string key, string value)
        {
            return new Params().And(key, value);
        }

        /// <summary>
        /// Adds another key/value pair to the Params map. Automatically
        /// converts all values to strings.
        /// <code>
        /// amadeus.get("/foo/bar", Params.with("first_name", "John").and("last_name", "Smith"));
        /// </code>
        /// </summary>
        /// <returns>the Param object, allowing for convenient chaining</returns>
        /// <param name="key">the key for the parameter to send to the API</param>
        /// <param name="value">the value for the given key</param>
        public Params And(string key, string value)
        {
            this[key] = value;
            return this;
        }

        /// <summary>
        /// Converts params into a HTTP query string.
        /// </summary>
        /// <returns>The query string.</returns>
        public string ToQueryString()
        {
            StringBuilder query = new StringBuilder();
            bool first = true;
            foreach (KeyValuePair<string, string> entry in this)
            {
                if (!first)
                {
                    query.Append("&");
                }
                first = false;
                try
                {
                    query.Append(System.Web.HttpUtility.UrlEncode(entry.Key, Encoding.UTF8));
                    query.Append("=");
                    query.Append(System.Web.HttpUtility.UrlEncode(entry.Value, Encoding.UTF8));
                }
                catch { }
            }

            return "?" + query.ToString();
        }

        public string ToBody()
        {
            return JsonConvert.SerializeObject(this);
        }

        /// <summary>
        /// Converts params into a HTTP query string.
        /// </summary>
        /// <returns>The string.</returns>
        public string toString()
        {
            return ToQueryString();
        }

        public static Params From(Dictionary<string, string> dict)
        {
            Params _params = new Params();
            foreach (var newelem in dict)
                _params.Add(newelem.Key.ToString(), newelem.Value.ToString());
            return _params;
        }

        //Method to convert simpe object to Params object
        public static Params FromModelDto(Object obj)
        {
            Params ret = new Params();

            foreach (PropertyInfo prop in obj.GetType().GetProperties())
            {
                string propName = prop.Name;
                var val = obj.GetType().GetProperty(propName).GetValue(obj, null);
                if (val != null)
                {
                    ret.Add(propName.Substring(0, 1).ToLower() + propName.Substring(1), val.ToString());
                }
                else
                {
                    ret.Add(propName.Substring(0, 1).ToLower() + propName.Substring(1), null);
                }
            }
            return ret;
        }

        // default values: radius=100, includeClosed=true, roomQuantity=1 - not needed, default for Amadeus API is 1
        public Params AddHotelSearchDefaultParams()
        {
            this.Add("radius", "100");
            this.Add("includeClosed", "true");
            this.Add("roomQuantity", "1");
            return this;
        }

        /// <summary>
        /// Returns a String that represents the current Params.
        /// </summary>
        /// <returns>A String that represents the current Params.</returns>
        public override string ToString()
        {
            return toString();
        }
    }
}