[].map.call(document.getElementsByTagName("table"), table => {
  try {
    const task = table.children[0].children[0].children[0].textContent;
    if ("task" === task) {
      return [].map.call(table.children[1].children, record => {
        const spend = record.children[2];
        const text = spend.childNodes[0];

        const times = text.nodeValue;
        if (times && /\d+:\d+(:\d+)?(\s*\+\s*\d+:\d+(:\d+)?)*/.test(times)) {
          spend.innerText = [
            times
              .split(/\s*\+\s*/)
              .map(v =>
                [v.split(":")].reduce(
                  (_, [h, m = 0, s = 0]) => h * 60 ** 2 + m * 60 + s * 1,
                  0
                )
              )
              .reduce((acc, v) => acc + v, 0)
          ].reduce(
            (_, v) =>
              Math.floor(v / 60 ** 2) +
              ":" +
              ("0" + Math.floor((v % Math.pow(60, 2)) / 60)).slice(-2) +
              ":" +
              ("0" + ((v % 60 ** 2) % 60)).slice(-2),
            0
          );
        }
      });
    }
  } catch (e) {}
});
