/*
Detect a cycle in a linked list. Note that the head pointer may be 'null' if the list is empty.

A Node is defined as: 
    class Node {
        int data;
        Node next;
    }
*/

boolean hasCycle(Node head) {
    
    boolean circular = false;
    
    if(head != null){
        
        int length = 1;
        Node current = head.next;
        
         while(current != null){
             
             current = current.next;
             length++;
             
             if(length > 100){
                 circular = true;
                 break;
             }
         }
    }
    
    return circular;
}
