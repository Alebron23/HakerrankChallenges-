//The key is to not fully sort each heap, just make sure the 
//the min or max is at the top 

var minHeap;
var maxHeap;

function main() {
    // n == how many numbers there will be
    var n = parseInt(readLine());
    var a = [];
    for(a_i = 0; a_i < n; a_i++){
       a[a_i] = parseInt(readLine());
    }
  
    //declare the heaps. 
    minHeap = new Heap();
    maxHeap = new Heap();

    for(i = 0; i < n; i ++){
        
       
        addToHeaps(a[i]);   //Add the new element to the heap.
        balanceHeaps();     //Balance them if they are not balanced. 
        getMedian();        //Get the median
    }
}

function addToHeaps(item){ // To add to the heaps, if the item is bigger than the min of the maxs on the min heap, then add it to the minHeap. Else if it smaller than max of the mins on the maxHeap, then add it to the maxHeap. Else just add it to the smaller heap. 
    
    if (!minHeap.size() || item >= minHeap.top()) { 
        minHeap.add(item, true);
    } else if (!maxHeap.size() || item <= maxHeap.top()) {
        maxHeap.add(item, false);
    } else {
       minHeap.size() > maxHeap.size() ? maxHeap.add(item, false) : minHeap.add(item, true); 
    }
}

function balanceHeaps(){ //If one heap is bigger than the other one by more than one, then take from the top of the bigger heap and add it to the other
    
    if (Math.abs(minHeap.size() - maxHeap.size()) > 1) {
        
        if(minHeap.size() > maxHeap.size()){
            maxHeap.add(minHeap.removeTop(true), false);
        } else {
            minHeap.add(maxHeap.removeTop(false), true);
        }
    }
}

function getMedian(){ //If heaps are equal in size, then the mean is top of both the heaps divided by 2. If they are not equal, then the mean is the top of the bigger one. 
    
    var median = 0;
    
    if(Math.abs(minHeap.size() - maxHeap.size()) === 1){
        
        if(minHeap.size() > maxHeap.size()){
            median = minHeap.top();
        } else {
            median = maxHeap.top();
        }
    } else {
        median = (minHeap.top() + maxHeap.top()) / 2;
    }
    
    console.log(median.toFixed(1));
}


//heap class
var Heap = function(){
    this._heap = [];
    this._size = 0;
};

Heap.prototype.switchItems = function(pos1, pos2) {

    var _heap = this._heap;
    var temp = _heap[pos1];
    _heap[pos1] = _heap[pos2];
    _heap[pos2] = temp;
};

Heap.prototype.size = function() {
    return this._size;
};

Heap.prototype.top = function() {
    return this._heap[0];
};

Heap.prototype.incrementSize = function() {
    this._size++;
};

Heap.prototype.decrementSize = function() {
    this._size--;
};

Heap.prototype.add = function(item, min) {
    //console.log(min);
    var _heap = this._heap;
    _heap[this.size()] = item;
    this.incrementSize();
    this.SiftUp(min);
};

Heap.prototype.removeTop = function(min) {

    //console.log(min);
    var _heap = this._heap;

    if(this.size() === 0){
        return null;
    }

    if(this.size() === 1){
        this.decrementSize();
        return _heap[0];
    }

    var tempTop = _heap[0];
    _heap[0] = _heap[this.size() - 1];
    this.decrementSize();
    this.Heapify(min);

    return tempTop;
};

Heap.prototype.getLeftChildIndex = function(pos) {
    return pos * 2 + 1;
};

Heap.prototype.getRightChildIndex = function(pos) {
    return pos * 2 + 2;
};

Heap.prototype.getParentIndex = function(pos) {
    return Math.floor((pos - 1) / 2);
};

Heap.prototype.hasLeftChild = function(pos) {
    return this.size() > this.getLeftChildIndex(pos);
};

Heap.prototype.hasRightChild = function(pos) {
    return this.size() > this.getRightChildIndex(pos);
};

Heap.prototype.hasParent = function(pos) {
    return this.getParentIndex(pos) >= 0;
};

Heap.prototype.leftChild = function(pos) {
    return this._heap[this.getLeftChildIndex(pos)];
};

Heap.prototype.rightChild = function(pos) {
    return this._heap[this.getRightChildIndex(pos)];
};

Heap.prototype.parent = function(pos) {
    return this._heap[this.getParentIndex(pos)];
};

Heap.prototype.SiftUp = function(min) {

    if(min == true){
        var pos = this.size() - 1;

        while (this.hasParent(pos)) {

            if(this._heap[pos] >= this.parent(pos)){
                break;
            } else {
                this.switchItems(pos, this.getParentIndex(pos), this.name);
                pos = this.getParentIndex(pos);
            }
        }
    } else {

        var pos = this.size() - 1;

        while(this.hasParent(pos)){

            if(this._heap[pos] <= this.parent(pos)){
                break;
            } else {
                this.switchItems(pos, this.getParentIndex(pos), this.name);
                pos = this.getParentIndex(pos);
            }
        }
    }
}

Heap.prototype.Heapify = function(min) {

    if (min == true) {

        var pos = 0;
        var _heap = this._heap;

        while(pos < this.size() && this.hasLeftChild(pos)){

            var minChildIndex = this.getLeftChildIndex(pos);

            if(this.hasRightChild(pos) && this.rightChild(pos) < _heap[minChildIndex]){
                minChildIndex = this.getRightChildIndex(pos);
            }

            if(_heap[pos] <= _heap[minChildIndex]){
                break;
            } else {
                this.switchItems(pos, minChildIndex, this.name);
                pos = minChildIndex;
            }
        }
        
    } else {

        var pos = 0;
        var _heap = this._heap;

        while(pos < this.size() && this.hasLeftChild(pos)){

            var maxChildIndex = this.getLeftChildIndex(pos);

            if(this.hasRightChild(pos) && this.rightChild(pos) > _heap[maxChildIndex]){
                maxChildIndex = this.getRightChildIndex(pos);
            }

            if(_heap[pos] >= _heap[maxChildIndex]){
                break;
            } else {
                this.switchItems(pos, maxChildIndex, this.name);
                pos = maxChildIndex;
            }
        }
    }

}

Heap.prototype.print = function() {

    for(i = 0; i < this._heap.length; i++) {
        console.log(this._heap[i]);
    }

    return '';
}
