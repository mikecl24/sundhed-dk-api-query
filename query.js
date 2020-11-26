
const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
var old_results = {OLD_RESULTS_COUNT};

async function getter() {
	a = await fetch("https://www.sundhed.dk/app/covidsvar/api/v1/covidsvar", {
		"credentials": "include",
		"headers": {
			"User-Agent": "{USER-AGENT}",
			"Accept": "application/json, text/plain, */*",
			"Accept-Language": "en",
			"x-queueit-ajaxpageurl": "https%3A%2F%2Fwww.sundhed.dk%2Fborger%2Fmin-side%2Fcorona%2Fcovidsvar%2F",
			"CONVERSATION-UUID": "{CONVERSATION-UUID}",
			"X-XSRF-TOKEN": "{X-XSRF-TOKEN}",
			"Sec-GPC": "1"
		},
		"referrer": "https://www.sundhed.dk/borger/min-side/corona/covidsvar/",
		"method": "GET",
		"mode": "cors"
	});
	j = await a.json();
	if (j.CovidSvar.length == old_results) {
		console.log("Not yet");
		return 0;
	} else {
		console.log("DONE");
		return 1;
	}
}

var condition = true
async function repeatedAPIQUERY() {
  while (condition) {
    await sleepNow(60000);
    res = getter();
	if (res == 1) {
	  condition = false;
	}
  }
}

repeatedAPIQUERY()
