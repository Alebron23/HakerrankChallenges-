function main() {
    
    //Declare variables
    var m_temp = readLine().split(' ');
    var m = parseInt(m_temp[0]);
    var n = parseInt(m_temp[1]);
    magazine = readLine().split(' ');
    ransom = readLine().split(' ');
    var map                 = new Map();
    var canReplicateNote    = 'Yes';
   
    //This for-loop adds the keys to the map with the value being the number of times the key has     //been added 
    for(i = 0; i<magazine.length; i++){
        
        //If the map already has the key, the value is pulled, incremented, then re-added. 
        if(map.has(magazine[i])){
            
            var temp = map.get(magazine[i]);
            temp++;
            map.set(magazine[i],temp);
        } else {
            
            //if it has not been seen, then the value is inititalized to one. 
            map.set(magazine[i], 1);
        }//end if-else
    }//end for-loop
    
    //This for cross references the elements of the ransom note, with the elements of the map that 
    //came from magazine article 
    for(j = 0; j < ransom.length; j++){
        
        //If the value is not in the map, then the note cannot be replicated, and the loop can             //terminate. 
        if(map.has(ransom[j]) != true){
            canReplicateNote = 'No';
            break;
            
        //If the element is in the map, but the value is equal to zero, then there are no more 
        //occurrences of that element in the magazine article, and therefore the note cannot be
        //made so set equal to 'No' and break from loop. 
        } else if(map.get(ransom[j]) == 0){
            canReplicateNote = 'No';
            break;
        }//end if-else
        
        //If the code reaches this point, then the element must be in the map, so its value must 
        //be pulled, decremented, and then readed to the map. 
        var temp2 = map.get(ransom[j]);
        temp2--;
        map.set(ransom[j], temp2);
    }//End for-loop
    
    //Return the answer of whether the ransom note can be made from the magazine article. 
    console.log(canReplicateNote);
}//End Function Main()
