//////// obj === obj.window判断window
export default function isWindow( obj ) {
	return obj != null && obj === obj.window;
}
