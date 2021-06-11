'use strict';

[].map.call(document.getElementsByTagName("table"), function (table) {
  try {
    var task = table.children[0].children[0].children[0].textContent;
    if ("task" === task) {
      return [].map.call(table.children[1].children, function (record) {
        var spend = record.children[2];
        var text = spend.childNodes[0];

        var times = text.nodeValue;
        if (times && /\d+:\d+(:\d+)?(\s*\+\s*\d+:\d+(:\d+)?)*/.test(times)) {
          spend.innerText = [
            times
              .split(/\s*\+\s*/)
              .map(function (v) { return [v.split(":")].reduce(
                  function (_, ref) {
                    var h = ref[0];
                    var m = ref[1]; if ( m === void 0 ) m = 0;
                    var s = ref[2]; if ( s === void 0 ) s = 0;

                    return h * Math.pow( 60, 2 ) + m * 60 + s;
                  },
                  0
                ); }
              )
              .reduce(function (acc, v) { return acc + v; }, 0)
          ].reduce(
            function (_, v) { return Math.floor(v / Math.pow( 60, 2 )) +
              ":" +
              ("0" + (v % Math.pow( 60, 2 )) / 60).slice(-2) +
              ":" +
              ("0" + ((v % Math.pow( 60, 2 )) % 60)).slice(-2); },
            0
          );
        }
      });
    }
  } catch (e) {}
});
