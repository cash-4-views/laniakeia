
function csvConverter(objArray) {
    "use strict";

    var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var len = array.length;

    for (var i = 0; i < len; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line !== '') line += ',';

            line += array[i][index];
        }

        str += line + '\r\n';
    }
    console.log(str);
    return str;
}

module.exports = csvConverter;

