$(window).load(function () {
    var audio = document.getElementById("audio");
    var arrmusics = [
        ["music/丑八怪 - 薛之谦.mp3", "丑八怪"],
        ["music/绅士 - 薛之谦.mp3", "绅士"],
        ["music/一半 - 薛之谦.mp3", "一半"],
        ["music/认真的雪 - 薛之谦.mp3", "认真的雪"]
    ];
    var $index = 4;
    var onoff = true;
    var volOnoff = true;
    var jindu;
    var distance;

    function musicStart() {
        audio.load();
        audio.play();
    }

    function changeMusicActive() {
        clearTimeout(t2);
        rotateClear();
        $(".goplay").removeClass('fa-play');
        $(".goplay").addClass('fa-pause');
        onoff = false;
        //延时播放，以让它有重新播放的特效
        var t2 = setTimeout(function () {
            $(".pic").css('animation', ' active 3s linear infinite  .5s');
            $(".handbar").css('transform', 'rotate(0deg)');
            musicTime();
        }, 500)
    }

    function rotateClear() {
        $(".pic").css('animation', ''); //清除旋转
        $(".handbar").css('transform', 'rotate(-20deg)');
    }

    function musicTime() {
        var time = null;
        spd = audio.duration;
        $('.min2').text(parseInt(spd / 60));
        $('.sec2').text(parseInt(spd % 60));
    }
    //播放按键
    $(".goplay").click(function () {
        musicTime();
        if (onoff) {
            audio.play();
            $(this).removeClass("fa-play");
            $(this).addClass("fa-pause");
            $(".pic").css('animation', ' active 3s linear infinite  .5s');
            $(".handbar").css('transform', 'rotate(0deg)');
        } else {
            audio.pause();
            $(this).removeClass("fa-pause");
            $(this).addClass("fa-play");
            rotateClear();
        }
        onoff = !onoff
    });

    //点击单曲播放
    $(".center > li").click(function () {
        changeMusicActive();
        $index = $(this).index();
        audio.src = arrmusics[$index][0];
        $("h1").text(arrmusics[$index][1]);
        musicStart();
    })


    //播放上一曲
    $(".fa-backward").click(function () {
        $index--;
        if ($index < 0) $index = 3;
        audio.src = arrmusics[$index][0];
        $("h1").text(arrmusics[$index][1]);
        musicStart();
        changeMusicActive();
    });
    //播放下一曲
    $(".fa-forward").click(function () {
        $index++;
        if ($index > 3) $index = 0;
        audio.src = arrmusics[$index][0];
        $("h1").text(arrmusics[$index][1]);
        musicStart();
        changeMusicActive();
    });
    //随机播放
    $(".fa-random").click(function () {
        $index = Math.floor(Math.random() * 4);
        audio.src = arrmusics[$index][0];
        $("h1").text(arrmusics[$index][1]);
        musicStart();
        changeMusicActive();
    });
    //重新播放
    $(".fa-undo").click(function () {
        if (!onoff) {
            musicStart();
        }
    })

    //进度移动
    $('.jindu').click(function (e) {
        e = e || event;
        var jindu_w = e.clientX - $(".jindu").offset().left;
        audio.currentTime = parseInt(jindu_w / 300 * audio.duration);
    })

    //播放时间
    audio.addEventListener('timeupdate', function () {
        distance = audio.currentTime;
        var disMin = parseInt(distance / 60) < 10 ? "0" + parseInt(distance / 60) : parseInt(distance / 60);
        var disSec = parseInt(distance % 60) < 10 ? "0" + parseInt(distance % 60) : parseInt(distance % 60);
        $('.min1').text(disMin);
        $('.sec1').text(disSec);
        var percent = audio.currentTime / audio.duration;
        $(".xxx").css('width', 300 * percent);
        if (distance >= audio.duration) {
            console.log(1)
            rotateClear();
            $index++;
            if ($index > 3) $index = 0;
            audio.src = arrmusics[$index][0];
            $("h1").text(arrmusics[$index][1]);
            musicStart();
            changeMusicActive();
        }
    })
    //音量键
    audio.volume = 0.5;
    var passvol = 100;
    $(".volkey").mouseover(function () {
        $(".vol").css("display", "block");
    });
    $(".volkey").mouseout(function () {
        $(".vol").css("display", "none");
    });
    $(".govolume").click(function () {
        if (volOnoff) {
            volpast = $(".vol1").css('height');
            $(this).removeClass("fa-volume-down");
            $(this).addClass("fa-volume-off");
            audio.volume = 0;
            $(".vol1").css('height', 0);
        } else {
            $(this).removeClass("fa-volume-off");
            $(this).addClass("fa-volume-down");
            audio.volume = parseInt(volpast) / 100;
            $('.vol1').css('height', volpast);
        }
        volOnoff = !volOnoff;
    });

    $(".vol").click(function (e) {
        e = e || event;
        var volH = $('.vol').offset().top + 100 - e.clientY;
        if (volH < 0) {
            volH = 0;
        }
        $(".vol1").css('height', volH);
        audio.volume = volH / 100;
    });
})