// Only count HTML whitespace
// Other whitespace should count in values
// https://infra.spec.whatwg.org/#ascii-whitespace
// 注释：this regExp is used to filter space！！
export default ( /[^\x20\t\r\n\f]+/g );
