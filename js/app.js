$(document).ready(function () {
    let app = {
        cards: ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
        'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf',
        'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'],
        moves: 0,
        rating: 3,
        startTime: 0,
        init: function () {
            app.startTime = new Date().getTime();
            app.moves = 0;
            $('.moves').text('0');
            if($('.fa-star-o').length !== 0)
                $('.stars i').removeClass('fa-star-o').addClass('fa-star');
            $('.deck').html("");
            app.shuffle();
        },
        shuffle: function () {
            let random = 0;
            let temp = 0;
            for (let i = 1 ; i < app.cards.length ; i++) {
                random = Math.round(Math.random() * i);
                temp = app.cards[i];
                app.cards[i] = app.cards[random];
                app.cards[random] = temp;
            }
            app.assignCards();
        },
        assignCards: function () {
            for (let i = 0 ; i < app.cards.length ; i++) {
                $('.deck').append('<li class="card"><i class="fa ' + app.cards[i] + '"></i></li>');
            }
            app.clickHandlers();
        },
        clickHandlers: function () {
            $('.card:not(".match, .open")').on('click', function () {
                if ($('.show').length > 1) { return true;}
                $(this).addClass('open show'); 
                app.checkMatch();
            });
        },
        checkMatch: function () {
            if ($('.open').length === 2) {
                app.moves++;
                app.setRating();
                $('.moves').text(app.moves);
                if ($('.open i').first().attr('class') === $('.open i').last().attr('class')) {
                    $('.open.show').addClass('match animated infinite rubberBand');
                    setTimeout(function () {
                        $('.open.show').removeClass('open show animated infinite rubberBand').unbind("click");;
                    }, 400);
                    app.checkWin();
                } else {
                    $('.open.show').addClass('unmatch animated infinite wobble');
                    setTimeout(function () {
                        $('.open.show').removeClass('animated infinite wobble');
                    }, 400);
                    setTimeout(function () {
                        $('.open.show').removeClass('open show unmatch');
                    }, 800);
                }
            }
        },
        setRating: function() {
            if(app.moves === 10) { 
                $('.stars i').eq(2).removeClass('fa-star').addClass('fa-star-o');
                app.rating--;
            }else if(app.moves === 20) {
                $('.stars i').eq(1).removeClass('fa-star').addClass('fa-star-o');
                app.rating--;
            }else if(app.moves === 30) {
                $('.stars i').eq(0).removeClass('fa-star').addClass('fa-star-o');
                app.rating--;
            }
        },
        checkWin: function () {
            if ($('.match').length === app.cards.length) {
                let totalTime = new Date().getTime() - app.startTime;
                let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                swal({
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    title: 'Congratulations! You Won!',
                    text: 'Time ' + minutes + ':' + seconds +' With ' + app.moves + ' Moves and ' + app.rating + ' Stars.\n Woooooo!',
                    type: 'success',
                    confirmButtonColor: '#02ccba',
                    confirmButtonText: 'Play again!'
                }).then(function(isConfirm) {
                    if (isConfirm) {
                        app.init();
                    }
                })
            }
        },
    }
    app.init();
});