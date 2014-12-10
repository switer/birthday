!function (exports) {
    'use strict;'

    var music = new Audio()
    music.src = 'http://switer.qiniudn.com/my.mp3'
    music.autoplay = false
    music.loop = true
    music.volume = 1
    music.load()

    var song = new Audio()
    var isPlay = false
    song.src = 'http://switer.qiniudn.com/2014-2.m4a'
    song.autoplay = false
    song.loop = true
    song.volume = 1
    song.load()


    function diffTime () {
        return (+ new Date('2014-12-11T00:00:00.000+0800')) - (new Date)
    }
    var countdown = new Vue({
        el: '#countdown',
        data: {
            time: diffTime(),
            timenow: false,
            done: !!localStorage.getItem('wished'),
            wishProcessing: false
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
                var cakeImage = document.querySelector('.cake img')
                var time = diffTime()
                this.$data.time = time > 0 ? time:0
                if (!time) {
                    if (!isPlay && this.$data.done) {
                        isPlay = true
                        if (this.wishProcessing) {
                            setTimeout(function () {
                                music.pause()
                                song.play()
                            }, 30*1000)
                        } else {
                            music.pause()
                            song.play()
                        }
                    }
                    this.$data.timenow = true
                    cakeImage.src = 'images/cake.webp'
                } else {
                    cakeImage.src = 'images/cake-unfired.webp'
                }
                if (!time && this.$data.done) {
                    cakeImage.src = 'images/cake-fired.webp'
                }

            }.bind(this), 500)
            if (this.$data.done) {
                var hero = document.querySelector('.hero')
                hero.className = hero.className + ' wished'
            }
        },
        methods: {
            wish: function (e) {
                this.$data.wishProcessing = true
                localStorage.setItem('wished', true)
                var tar = e.currentTarget

                this.$data.done = true
                var cakeImage = document.querySelector('.cake img')
                cakeImage.src = 'images/cake-fired.webp'

                var hero = document.querySelector('.hero')
                hero.className = hero.className + ' wished'

                music.play()
            }
        }
    })
    exports.module = countdown;
}(window);