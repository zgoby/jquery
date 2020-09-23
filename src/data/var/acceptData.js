/**
 * Determines whether an object can have data
 */
//////// 事件绑定仅接受nodeType===1||===9的，即element,document
export default function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
}
