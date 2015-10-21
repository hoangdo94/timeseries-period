function support(timeseries, p, s) {
	var proj = '';
	for (var i = s; i<timeseries.length; i+=p) {
		proj += timeseries[i];
	}
	var z = 0;
	for (var i=1; i<proj.length; i++) {
		if (proj[i] === '1' && proj[i-1] === '1') z++;
	}
	return z/(proj.length - 1);
}

function findPeriod(timeseries, threshold) {
    var n = timeseries.length;
    for (var p=1; p<=n/2; p++) {
    	for (var s=0; s< n-p; s++) {
    		var c = support(timeseries, p ,s);
    		if (100*c > threshold) {
    			return {
    				p: p,
    				s: s,
    				c: c,
    			}
    		}
    	}
    }
}

$('#input-form').submit(function(e) {
    e.preventDefault();
    var timeseries = $('#input-string').val();
    var threshold = parseInt($('#input-threshold').val());
    var result = findPeriod(timeseries, threshold);
    console.log(result);
});
