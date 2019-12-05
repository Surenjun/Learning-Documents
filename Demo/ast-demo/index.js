const acorn  = require('acorn');


console.dir(acorn.parse("let a = 1").body[0]);