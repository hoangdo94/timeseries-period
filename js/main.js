function support(timeseries, p, s) {
    var proj = '';
    for (var i = s; i < timeseries.length; i += p) {
        proj += timeseries[i];
    }
    var z = 0;
    for (var i = 1; i < proj.length; i++) {
        if (proj[i] === '1' && proj[i - 1] === '1') z++;
    }
    return z / (proj.length - 1);
}

function findPeriod(timeseries, threshold) {
    var n = timeseries.length;
    for (var p = 1; p <= n / 2; p++) {
        for (var s = 0; s < p; s++) {
            var c = support(timeseries, p, s);
            if (100 * c > threshold) {
                return {
                    p: p,
                    s: s,
                    c: c,
                }
            }
        }
    }
}

function findPeriodHeur(timeseries, threshold) {
    var n = timeseries.length;
    var currBestP = {
        period: 0,
        score: 0,
    };
    //loop p
    for (var p = 1; p <= n / 2; p++) {
        //heuristic score
        var heurScore = 0;
        for (var i = 0; i < n - p; i++) {
            if (timeseries[i] === '1' && timeseries[p + i] === '1') heurScore++;
        }
        heurScore = heurScore/(n-p);
        if (heurScore > currBestP.score) {
            currBestP = {
                period: p,
                score: heurScore
            }
        }
    }
    //loop s
    var p = currBestP.period;
    for (var s = 0; s < p; s++) {
        var c = support(timeseries, p, s);
        if (100 * c > threshold) {
            return {
                p: p,
                s: s,
                c: c,
            }
        }
    }
}


$('#input-form').submit(function(e) {
    e.preventDefault();
    var timeseries = $('#input-string').val();
    var threshold = parseInt($('#input-threshold').val());
    var algorithm = $('#input-algorithm').val();
    if (algorithm == 'bf') {
       var result = findPeriod(timeseries, threshold);
    } else {
        var result = findPeriodHeur(timeseries, threshold);
    }
    
    if (result) {
        $('#result').empty()
            .append('<p>Period: ' + result.p + '</p>')
            .append('<p>Start Index: ' + result.s + '</p>')
            .append('<p>Support: ' + Math.round(result.c * 10000) / 100 + '%</p>');
    } else {
        $('#result').empty()
            .append('<p>Cannot find Period with ' + threshold + '% threshold</p>');
    }
});
