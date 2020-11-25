// Make requests to CryptoCompare API
export async function makeApiRequest(path) {
	try {
		const response = await fetch(process.env.VUE_APP_API_URL+`${path}`);
		
		return response.json();
	} catch (error) {
	
		throw new Error(`CryptoCompare request error: ${error.status}`);
	}
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
	const short = `${fromSymbol}/${toSymbol}`;
	return {
		short,
		full: `${exchange}:${short}`,
	};
}

export function parseFullSymbol(fullSymbol) {
	var n = fullSymbol.match("TRU-E");
	if(n){
		var str = fullSymbol.split(":");
		var match = str[1].split("/");
		
		return {
			exchange: str[0],
			fromSymbol: match[0],
			toSymbol: match[1],
		};
	}else{
		const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
		if (!match) {
			return null;
		}

		return {
			exchange: match[1],
			fromSymbol: match[2],
			toSymbol: match[3],
		};
	}
	
}