function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var k = parseInt(n_temp[1]);
    a = readLine().split(' ');
    a = a.map(Number);
    
   
   
    var returnString = '';
    var temp;
    
    for(i=0; i<k; i++){
        temp = a[0];
        a.shift();
        a.push(temp);
    }
    
    for(m=0; m<n; m++){
        returnString += a[m] + ' ';
    }
    
    console.log(returnString);
    
}
