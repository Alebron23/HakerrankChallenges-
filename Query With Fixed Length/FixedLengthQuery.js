/**
 * Created by victorlebron on 1/25/17.
 * 
 * Description: This function reads a series of queries of size d. It then finds
 *              the max of each query size of d from a sequence of numbers, starting
 *              at the beginning of the sequence and sliding by one element
 *              at a time until the end of the array and finding the max of
 *              each query size after each slide increment in the array. After all the
 *              maxes have been found it then returns the minimum of those
 *              maxes. After the program is completed it will have outputted a
 *              series of minimums from a series of maximums from each subsequent
 *              query size of d.
 */

var Queue           = require('./TwoStackQueue');
var fs              = require('fs');
var Deque           = require('./Deque');



function queryWithFixedLength(queries, sequence) {

    //This outer for-loop handles all the queries q of the text file. So if you have to run 5 queries, it will execute 5 times.
    for(i = queries.length-1; i >= 0; i--){

        //Declare
        var queue    = new Queue();
        var minQueue = new Deque();
        var maxQue   = new Deque();

        //m is the index to the first element, in reality the last element because the way the file is read in, and moves
        //along to the subsequent element. Can use for loop variable because it keeps track of how many elements to put in queue, not there indexes.
        var m        = sequence.length - 1;
        //started makes sure that when the query starts that the first element is automatically put in the queue and deque
        var started  = false;

        //this for-loop adds the initial elements of query size d to the queue, and finds there max.
        for(j = queries[i]; j>0; j--){

            //This if makes sure first element is put in both queues automaticall since there is nothing else in there.
            if(started == false){
                maxQue.pushBack(parseInt(sequence[m]));
                queue.enqueue(parseInt(sequence[m]));
                started = true;
            } else {

                queue.enqueue(sequence[m]);

                //keeps track of deque size so the element can make it to the top of deque if it is the largest.
                var maxQueSize = maxQue.size();

                //This while takes care of getting the element to the top of the deque if it the largest or putting
                //it in its correct place in the deque.
                while((parseInt(sequence[m])) > (parseInt(maxQue.peekBack())) &&  maxQueSize > 0) {
                    maxQue.popBack();
                    maxQueSize--;
                }//end while

                //add the element to the deque anyway after its place has been found.
                maxQue.pushBack(sequence[m]);
            }//end if-else

            m--;
        }//end for-loop

        //Puts the max of the first query size of d in the minQue so it can be compared to all the other maxes.
        minQueue.pushFront(maxQue.peekFront());

        //This for adds and finds the max elements for the subsequent elements in the array after the initial entering of the first query size of d.
        for(k = (sequence.length -1) - queries[i]; k>=0; k--){

            //The element that is now exiting the array must be checked to see if it is the max of the deque.
            if(queue.front() === maxQue.peekFront()){
                maxQue.popFront();
            }//end if

            //Takes out exiting element and puts in the new element.
            queue.dequeue();
            queue.enqueue(sequence[k]);

            var sizeOfMax = maxQue.size();

            //Finds new elements place in the deque, taking out the elements that are smaller
            while((parseInt(sequence[k])) > (parseInt(maxQue.peekBack())) &&  sizeOfMax > 0){
                maxQue.popBack();
                sizeOfMax--;
            }//end while

            //Puts current element in the maxQue after its place has been found.
            maxQue.pushBack(sequence[k]);

            //Checks to see if this max is the smallest max that has been found yet.
            if(parseInt(maxQue.peekFront()) < parseInt(minQueue.peekFront())){
                minQueue.pushFront(maxQue.peekFront());
            } else {
                minQueue.pushBack(maxQue.peekFront());
            }//end if-else

        }//end for-loop

        //Returns the smallest max that was found from the query.
        console.log(minQueue.peekFront());
    }//end for-loop
}//end function QueueWithFixedLength()

function processData(input) {

    var arrayOfFile         = fs.readFileSync(input).toString().split("\n");
    var arrayOfFirstLine    = arrayOfFile[0].toString().split(' ');
    var arrayOfSequence     = [];
    var arrayOfQueries      = [];

    var fileLength          = arrayOfFile.length;
    var numOfQueries        = arrayOfFirstLine[1];

    //gets the start of the sequence from the file by subracting the number of queries from the file
    //length to arrive at the appropriate line number to start at the end of the sequence.
    var startOfSequence     = fileLength-numOfQueries -1;

    for(i=fileLength -1; i>=fileLength-numOfQueries; i--){
        arrayOfQueries.push(arrayOfFile[i]);
    }

    for(k=startOfSequence; k>=1;k--){
        var lineArray = arrayOfFile[k].toString().split(' ');


        for(i=lineArray.length-1;i >=0; i--){
            arrayOfSequence.push(lineArray[i]);
        }
    }

    //arrayOfQueries and arrayOfSequence are both backwards because the way the push
    //function works, it doesn't work like a stack, it just pushes them in like a queue.
    //Pass the query array, and the sequence array to another function to
    //be processed.
    queryWithFixedLength(arrayOfQueries, arrayOfSequence);
}


var doIt = processData('babyinput.txt');
