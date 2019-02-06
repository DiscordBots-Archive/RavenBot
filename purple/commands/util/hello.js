const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment')

class HelloCommand extends Command {
    constructor() {
        super('hello', {
           //aliases: ['hello'],
           description: {
               conntent: 'Hello Command',
               usage: '[command]'
           },
           category: 'util',
           typing: true,
           ratelimit: 2,
           args: [
               {
                   id: 'member',
                   type: 'member'
               }
           ]
        });
    }

    async exec(message, args) {
        const msg = `Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.Throughout this article we showed how you can read and write JSON data from and to files, which is a very common and important task to know how to do as a web programmer.

        There are a couple of methods in the fs module both for reading from and writing to JSON files. The readFile and readFileSync functions will read JSON data from the file in an asynchronous and synchronous manner, respectively. You can also use the global require method to handle reading/parsing JSON data from a file in a single line of code. However, require is synchronous and can only read JSON data from files with '.json' extension.
        
        Similarly, the writeFile and writeFileSync functions from the fs module write JSON data to the file in an asynchronous and synchronous manner respectively.`

        if (msg.length > 1900) {
            message.channel.send(`${msg}`, {split:"\n", code: "json"})
        }
    }
}

module.exports = HelloCommand;