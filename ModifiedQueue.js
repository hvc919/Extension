const Lenght = 100;
var User = require("./User.js");
class Queue
{
    
    constructor()
    {
        this.array= [];
    }
    Add_Del(val)
    {
        this.array.push(val);
        if(this.array.length>100)
        {
            this.array.shift();
        }
    }
    Sort(val)
    {
        if(this.array.includes(val))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    Delete(val)
    {
        for( var i = 0; i < this.array.length; i++){ 
            if ( this.array[i].compare(val)) 
            {
              this.array.splice(i, 1); 
            }
         }
    }
    GetArray()
    {
        return this.array;
    }

    




}
module.exports = Queue;