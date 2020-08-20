// rtagName captures the name from the first start tag in a string of HTML
// https://html.spec.whatwg.org/multipage/syntax.html#tag-open-state
// https://html.spec.whatwg.org/multipage/syntax.html#tag-name-state
//////// 匹配tagName的正则
export default ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );
