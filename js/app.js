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
                $('.moves').text(app.moves);
                if ($('.open i').first().attr('class') === $('.open i').last().attr('class')) {
                    $('.open.show').addClass('match animated infinite rubberBand');
                    setTimeout(function () {
                        $('.open.show').removeClass('open show animated infinite rubberBand').unbind("click");;
                    }, 400);     
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
    }
    app.init();
});