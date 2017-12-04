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
        },
    }
    app.init();
});