
/**
 * Created by victorlebron on 1/13/17.
 */

var fs = require('fs');

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
            let poppedItem = stackItems[stackIndex];
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

function twoStackQueue() {

    //Stack declarations
    var inputStack  = new Stack();
    var outputStack = new Stack();

    this.enqueue = function(item) {
        inputStack.push(item);
    }//end method enqueue()

    this.dequeue = function() {
        //Check first to see if Stack is empty. If its not, then just pop and return the element
        //like normal.
        if(outputStack.isEmpty()){
            //Now check to see if the first stack is empty to see if there are any elements in the                 //queue. If the first stack is not empty, then the elements must be moved before they can
            //be popped from the second queue
            if(inputStack.isEmpty()){
                console.log("The queue is empty. Cannot " +
                    "dequeue.");
            } else {
                this.moveStack(inputStack, outputStack);
                top = outputStack.pop();
                return top;
            }//end if-else
        } else {

            //return frist item off stack2
            //which is frist item in queue
            top = outputStack.pop();

            //return first item in queue
            return top;
        }//end if-else
    }//end method dequeue()


    this.print = function() {

        if(outputStack.isEmpty()){
            if(inputStack.isEmpty()){
                console.log("The queue is empty.");
            } else {
                this.moveStack(inputStack, outputStack);
                console.log(outputStack.peek());
            }//end if-else
        } else {
            console.log(outputStack.peek());
        }//end if-else

    }//end method print()


    this.moveStack = function(stackOne, stackTwo) {

        while(!stackOne.isEmpty()) {
            stackTwo.push(stackOne.pop());
        }//end while
    }//end method moveStack()
}


function processData(input) {

    //array containing the lines of the text file
    var fileArray   = fs.readFileSync(input).toString().split("\n");
    var arrayOfLine = [];
    var queueStack  = new twoStackQueue();


    for(i=1; i<=fileArray[0]; i++){

        arrayOfLine = fileArray[i].toString().split(' ');

        switch (parseInt(arrayOfLine[0])) {
            case 1:
                queueStack.enqueue(arrayOfLine[1]);
                break;
            case 2:
                queueStack.dequeue();
                break;
            case 3:
                queueStack.print();
        }//end switch statement

    }//end for statement
}



var readfile = new processData('greet.txt');



