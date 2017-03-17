function Trie(){
    this.root = {};
    this.root.count = 0;
}

Trie.prototype.add = function(word){
    var child = this.root;
    
    for(var i=0; i < word.length; i++){ //Loops through the entire word to add each letter to the trie. 
        
        if(!child[word.charAt(i)]){ //If the letter is not in the trie, then add a new property to the object at that letter
            
            child[word.charAt(i)] = {};
            child[word.charAt(i)].count = 0;
        }
        
        child.count++;                //Increment the letter counter for that current letter
        child = child[word.charAt(i)]; //Move to the next letter 
    } 
    child.count++;                    //Increment the letter counter for the last element since for-loop terminates before it is accessed.
};

Trie.prototype.search = function(letters){
    
    if(this.root == undefined || this.root == null){ 
        return 0;
    }
    
    var node = this.root;
    
    for(var i=0; i < letters.length; i++) {
        
        var letter = letters.charAt(i);
        
        if(node.hasOwnProperty(letter)){ //if the letter is present in the object, then move to the next letter otherwise return 0.
            node = node[letter];
        } else {                        
            return 0;
        }
    } 
    
    return node.count;  // Return the letter counter of the last element visitied. 
}

function main() {
    var n    = parseInt(readLine());
    var trie = new Trie();
    
    for(var a0 = 0; a0 < n; a0++){
        var op_temp = readLine().split(' ');
        var op = op_temp[0];
        var contact = op_temp[1];
        
        if(op == "add"){
            trie.add(contact);
        } else if(op == "find"){
           console.log(trie.search(contact));
        }
    }

}
