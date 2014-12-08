!function (exports) {
    'use strict;'

    function diffTime () {
        return (+ new Date('2014-12-11T00:00:00.000Z')) - (new Date)
    }
    var countdown = new Vue({
        el: '#countdown',
        data: {
            time: diffTime()
        },
        filters: {
            dateTime: function (time, template) {
                var days, hours, minutes, seconds;
                days = parseInt(time/(24*60*60*1000));
                time = time%(24*60*60*1000);
                hours = parseInt(time/(60*60*1000));
                time = time%(60*60*1000);
                minutes = parseInt(time/(60*1000));
                time = time%(60*1000);
                seconds = parseInt(time/1000);

                return template.replace(/^('|")/, '')
                          .replace(/('|")$/, '')
                          .replace('dd', days)
                          .replace('hh', hours)
                          .replace('mm', minutes)
                          .replace('ss', seconds)
                          .replace(/[0-9]/g, function (m) {
                                if (m == '1' || m == '7' || m == '9') {
                                    return '<img class="small" src="images/numbers/%s.png"/>'.replace('%s', m)
                                } else {
                                    return '<img src="images/numbers/%s.png"/>'.replace('%s', m)
                                }
                            })
            }

        },
        ready: function () {
            setInterval(function () {
                this.$data.time = diffTime()
            }.bind(this), 500)
        },
        methods: {}
    })
    exports.module = countdown;
}(window);