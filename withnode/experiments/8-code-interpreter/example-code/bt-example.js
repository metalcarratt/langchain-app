import { BinaryTree } from './binary-tree.js';

const tree = new BinaryTree(1, 'AB');

tree.insert(1, 11, 'AC');
tree.insert(1, 12, 'BC');
tree.insert(12, 121, 'BG', { right: true });

[...tree.preOrderTraversal()].map(x => x.value);
// ['AB', 'AC', 'BC', 'BCG']

[...tree.inOrderTraversal()].map(x => x.value);
// ['AC', 'AB', 'BC', 'BG']

tree.root.value;                // 'AB'
tree.root.hasChildren;          // true

tree.find(12).isLeaf;           // false
tree.find(121).isLeaf;          // true
tree.find(121).parent.value;    // 'BC'
tree.find(12).left;             // null
tree.find(12).right.value;      // 'BG'

tree.remove(12);

[...tree.postOrderTraversal()].map(x => x.value);
// ['AC', 'AB']