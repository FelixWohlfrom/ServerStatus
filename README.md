# ServerStatus
Small nodejs server that displays the current server status via a REST api as json.
It has a plugin structure, so you can add your own plugins in the plugins folder of
the project.

# Reading the information
To retreive the information, there are two GET urls:
/overview - Returns the a more compact overview of the server
/details - Returns details about the server status

# Writing your own plugin
If you want to provide your own plugin, you need the following minimum information:
```
module.exports = {
    overview: function() {
            return element;
        },

    details: function() {
            return element;
        }
};
```

Each element has to look like this:
```
{
    label: "displayed_label",
    value: "single_value",
    max: "single_value",
    medium: "single_value",
    high: "single_value",
    values: "array_of_element"
}
```
Each of the properties is optional.
"label" sets the displayed label in both the overview and the details.
"value" contains a single value.
"max" contains the maximum value that "value" can reach.
"medium" contains a marker, which marks the "value" as 'medium'.
"high" contains a marker, which marks the "value" as 'high'.
"values" contains an array of "element"s.

## Usage
Configure the server status in config.js. Here you can e.g. enable or disable the plugins.
Install dependencies using "npm install".
Start the server using "npm start".

## Requirements
npm 2.9.1
nodejs 0.10 (If process plugin on linux is used, nodejs 0.12)
