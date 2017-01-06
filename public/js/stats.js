// Process User
var numberpools = [];
var counts = {};

for (var i = 0; i < users.length; i++) {
    var dss = new Date(users[i].created_at);
    const month = dss.getMonth() < 10 ? '0' + (dss.getMonth() + 1) : (dss.getMonth() + 1);
    var ds = dss.getFullYear() + '-' + month + '-' + dss.getDate();
    if (!numberpools.includes(ds)) {
        numberpools.push(ds);
    }

    if (!counts[ds]) counts[ds] =0;
    counts[ds]++;
}

var orderCounts = [];
var annotSorted = [];

for (i = 0; i < numberpools.length; i++) {
    if (!counts[numberpools[i]]) counts[numberpools[i]] = 0;
    orderCounts.push(counts[numberpools[i]]);
}

numberpools.unshift('x');
orderCounts.unshift('Users registered');

// Converting annotations into xLines form for c3.js
let xLines = annotations.reduce(function(acc, val){
    let newVal = { "value": new Date(val.time), "text": val.info};
    acc.push(newVal);
    return acc;
}, []);

var chart = c3.generate({
    bindto: "#chart",
    data: {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            numberpools,
            orderCounts,
        ],
        labels: true
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    },
    grid: {
        x: {
            type: 'timeseries',
            lines: xLines
        }
    },
    size: {
        width: 1000
    }
});