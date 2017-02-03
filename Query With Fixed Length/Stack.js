/**
 * Created by victorlebron on 2/3/17.
 */

function Stack() {

    var stackIndex = 0;
    var stackItems = [];


    //have to declare methods this way with this.
    //or else it is not considered a function
    this.push = function(element){

        stackIndex++;
        stackItems[stackIndex] = element;
    }

    this.pop = function() {

        //covers the case when the stack is empty
        if(stackIndex == 0){
            console.log("The stack is empty");
        }else {
            var poppedItem = stackItems[stackIndex];
            stackIndex--;
            return poppedItem;
        }
    }

    this.peek = function(){

        if(stackIndex == 0)
        {
            console.log("The stack is empty")
        }else{
            return stackItems[stackIndex];
        }
    }

    this.isEmpty = function() {

        //returns true if stack index is equal to 0
        return stackIndex == 0;
    }

    this.clear = function(){

        stackItems = [];
        stackIndex = 0;
    }

    this.size = function() {

        return stackIndex;
    }

    this.print = function(){

        for(i=stackIndex ; i > 0; i--){
            console.log(stackItems[i]);
        }
    }
}

module.exports = Stack;
