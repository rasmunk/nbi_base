/**
 * Created by rasmusmunk on 27/09/2017.
 */


function removeChildren(obj) {
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild);
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function removeChildren(obj) {
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild);
    }
}

function setupThumbnailHoverEffect(thumbnail) {
    thumbnail.onmouseover = function () {
        this.style.borderColor = "#46743c";
        this.style.borderWidth = "6px";
    };
    thumbnail.onmouseout = function () {
        this.style.borderColor = "#8fd182";
        this.style.borderWidth = "2px";
    };
}


function setupOverview() {
    var thumbnails = document.getElementsByClassName('thumbnail');
    for (var thumbnail in thumbnails) {
        if (thumbnails.hasOwnProperty(thumbnail)) {
            setupThumbnailHoverEffect(thumbnails[thumbnail]);
        }
    }
}


function setupTagSearch(createTileCallback) {
    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;  //time in ms, 2 seconds
    var $input = $('#tag');
    var form = $('#form-search');

    //disable enter submit
    form.on('submit', function() { return false; });

    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(tagReady, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    function tagReady() {
        $('.loading-spinner').show();
        var _data = {
            'tag': $input.val(),
            'csrf_token': $('#csrf_token').val()
        };
        $.ajax({
            url: '/search',
            data: _data,
            type: 'POST',
            success: function (response) {
                var gridItems = document.getElementById('grid-items');
                removeChildren(gridItems);
                for (var results in response) {
                    if (response.hasOwnProperty(results)) {
                        for (var result in response[results]) {
                            if (response[results].hasOwnProperty(result)) {
                                var tile = createTileCallback(response[results][result]);
                                // Access thumbnail child element -> attach hover effect
                                setupThumbnailHoverEffect(tile.getElementsByClassName('thumbnail')[0]);
                                gridItems.appendChild(tile);
                            }
                        }
                    }
                }
                $('.loading-spinner').hide();
            },
            error: function (error) {
                $('.loading-spinner').hide();
            }
        });
    }
}

$(document).ready(function () {
    setupOverview();
});