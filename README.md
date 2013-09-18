# generator-front-o-matic

* A generator for [Yeoman](http://yeoman.io). Based on *Kaleidos* front-end structure and workflow.
* Current version **alpha 0.0.3**
* Update: Still in Alpha (but suitable for developement!) 

Installation
--------------

```sh
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 Version 2, December 2004
 
 Copyright (C) 2004 Sam Hocevar
  14 rue de Plaisance, 75014 Paris, France
 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.
 
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 
  0. You just DO WHAT THE FUCK YOU WANT TO.
```


### Front-o-matic Stack

**Front-o-matic** includes so far:

* HTML5 boilerplateH
* HTML5Shiv
* LESS
* LESSHat
* KHelpers - _Kaleidos LESS Helpers_
* RequireJS
* jQuery
* CoffeeScript
* Underscore
* BackboneJs

### Features

* Js Linting _for statiic js files like Gruntfile_
* CoffeScript linting
* Image optimization
* HTML hinting
* HTML prettifying
* LESS linting
* Less Compiling and concat
* Minify _for development_
* CoffeScript compiler.
* JS Uglifier
* Local Server
* Watch and reload _when changes on any file in the project_

### How to install?

![](http://i.imgur.com/JHaAlBJ.png)

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository.
You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

Since **front-o-matic** it's not yet ready for the official grunt repo, you can:

Clone or fork the project in your computer

Create a link

```
$ npm -g link
```

Go to the folder you want to create your project on and type

```
$ yo front-o-matic
```

Run

```
$ Grunt
```

Open the server

```
$ localhost:9001
```

### Hacking
You can change the optional output **front-o-matic** folder:

Edit

```
$ Gruntfile.js
```

Find the variable **globalConfig** and change its dest value for the folder where you want your output.


###Contribute
We are regularly asked whether we can add or take away features. If a change is good enough to have a positive impact on all users, we are happy to consider it.

If not, generator-webapp is fork-friendly and you can always maintain a custom version which you npm install && npm link to continue using via yo webapp or a name of your choosing.
