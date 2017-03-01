/* Hidden stub code will pass a root argument to the function below. Complete the function to solve the challenge. Hint: you may want to write one or more helper functions.  

The Node class is defined as follows:
    class Node {
        int data;
        Node left;
        Node right;
     }
*/

    public class BSTNode{
        
        int data;
        BSTNode parent;
        BSTNode left;
        BSTNode right;

        public BSTNode(int data)
        {
            this.data = data;
            this.left = null;
            this.right = null;
            this.parent = null;
        }

        public BSTNode(){}
    }


    public class BSTFunctions{
   
        BSTNode ROOT;

        public BSTFunctions(){
            this.ROOT = null;
        }

        void insertNode(BSTNode node, int data){
            
            if (node == null){
                node = new BSTNode(data);
                ROOT = node;
            } else if (data < node.data && node.left == null){
                node.left = new BSTNode(data);
                node.left.parent = node;
            } else if (data > node.data && node.right == null){
                node.right = new BSTNode(data);
                node.right.parent = node;
            } else if(data == node.data){
                isThisABST = false;
            }else {
                if (data < node.data) {
                    insertNode(node.left, data);
                } else {
                    insertNode(node.right, data);
                }
            }
        }

        public BSTNode returnHead(){

            return tree.ROOT;
        }

        public boolean search(BSTNode node, int data) {
            
            if (node == null) {
                return false;
            } else if (node.data == data) {
                return true;
            } else {
                
                if (data < node.data) {
                    return search(node.left, data);
                } else {
                    return search(node.right, data);
                }
            }
        }
    
        public void printInOrder(BSTNode node) {
            
            if (node != null) {
                printInOrder(node.left);
                System.out.print(node.data + " - ");
                printInOrder(node.right);
            }
        }
    }
    
//-------------------------------------------------------------------------
    
    //The tree and the boolean value that keeps track of weather there is a descrepency in the bst. 
    BSTFunctions tree = new BSTFunctions();
    boolean isThisABST = true;

    boolean checkBST(Node root) {
         
        createBST(root);
        BSTNode returnedNode = tree.returnHead();
        isABST(root, returnedNode);
            
        return isThisABST;  
    }

    //This function takes a bst and creates another bst from its contents. If the first bst that you are 
    //given is not a correct bst, then the one that is created can be cross referenced to tell if it is 
    //correct or not. 
    void createBST(Node rootnode){ 
        
        //Insert data into new bst, and then pass next nodes so they can be inserted. 
        tree.insertNode(tree.ROOT, rootnode.data);
        
            if(rootnode.left != null){
                createBST(rootnode.left);
            }
            
            if(rootnode.right != null){
                createBST(rootnode.right);
            }         
    }

    //This function cross references the bst that you are given and the one that you created from the 
    //contents of the bst that you are given. 
    void isABST(Node root, BSTNode correcttree){
        
        //the boolean value is a global variable and is set to false if there are any descrepencies. 
        if(root.data != correcttree.data){
            isThisABST = false;
        } else {
            //If one node is null and the other is not, set to false, otherwise just pass next nodes
            //to the function. 
            if(root.left != null && correcttree.left == null){
                isThisABST = false;
            } else if(root.left == null && correcttree.left != null){
                isThisABST = false;
            } else if(root.left != null & correcttree.left != null){
                isABST(root.left, correcttree.left);
            }
            
            //If one node is null and the other is not, set to false, otherwise just pass next nodes
            //to the function. 
            if(root.right != null && correcttree.right == null){
                isThisABST = false;
            } else if(root.right == null && correcttree.right != null){
                isThisABST = false;
            } else if( root.right != null && correcttree.right != null){
                isABST(root.right, correcttree.right);
            }
        }
        
        
     }
     
