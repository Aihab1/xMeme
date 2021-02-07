//======================= For Frontend ==============================
document.addEventListener('DOMContentLoaded', () => {

    //Toggling meme submission form from the post meme button
    const post_meme_button = document.querySelector('#post-meme-button');
    const meme_form = document.querySelector('#main-form');
    const submit_button = document.querySelector('#create');

    post_meme_button.addEventListener('click', () => {
        meme_form.classList.toggle('open');
        hamburger.classList.toggle('clicked');

        //Closing meme submission form when a meme is posted
        if (meme_form.classList.contains('open')) {
            submit_button.addEventListener('click', () => {
                meme_form.classList.toggle('open');
                hamburger.classList.toggle('clicked');
            });
        }
    });

    //Toggling meme submission form from the hamburger
    const hamburger = document.querySelector('#hamburger');

    hamburger.addEventListener('click', () => {
        meme_form.classList.toggle('open');
        hamburger.classList.toggle('clicked');

        //Closing meme submission form when a meme is posted
        if (meme_form.classList.contains('open')) {
            submit_button.addEventListener('click', () => {
                meme_form.classList.toggle('open');
                hamburger.classList.toggle('clicked');
            });
        }
    });

    const hamburger_quit_editing = document.querySelector('#hamburger-quit-editing');
    const editing_form = document.querySelector('#editing-form');
    const update_button = document.querySelector('#update');

    //Removing all data when hamburger-quit-editing is clicked
    hamburger_quit_editing.addEventListener('click', () => {
        hamburger_quit_editing.classList.toggle('clicked');
        editing_form.classList.toggle('open');
        document.querySelector('#edit-username').value = '';
        document.querySelector('#edit-caption').value = '';
        document.querySelector('#edit-image-link').value = '';
        document.querySelector('#meme_id').innerHTML = '';
    });

    //Removing all data and closing the update form when a meme is updated
    update_button.addEventListener('click', () => {
        hamburger_quit_editing.classList.toggle('clicked');
        editing_form.classList.toggle('open');
        document.querySelector('#edit-username').value = '';
        document.querySelector('#edit-caption').value = '';
        document.querySelector('#edit-image-link').value = '';
        document.querySelector('#meme_id').innerHTML = '';
    });

});
//======================= Frontend \End =============================

//======================= For Backend ===============================

// Ajax stuff

// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function () {
    'use strict';

    let $event_pump = $('body');

    // Return the API
    return {
        'read': function () {
            let ajax_options = {
                type: 'GET',
                url: '/memes',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
                .done(function (data) {
                    $event_pump.trigger('model_read_success', [data]);

                    //Edit form can only be toggled via id after we create the meme elements which in turn will call the read model
                    const hamburger_quit_editing = document.querySelector('#hamburger-quit-editing');
                    const editing_form = document.querySelector('#editing-form');

                    //Toggling the edit-form for editing
                    document.querySelectorAll('.edit').forEach(edit_button => {
                        edit_button.addEventListener('click', () => {
                            const myClass = edit_button.className.split(' ')[1];
                            const memeDiv = document.getElementById(myClass);
                            const oldName = memeDiv.children[0].innerHTML;
                            const oldCaption = memeDiv.children[1].innerHTML;
                            const oldURL = memeDiv.children[2].src;
                            const id = myClass.substring(4);
                            document.querySelector('#edit-username').value = oldName;
                            document.querySelector('#edit-caption').value = oldCaption;
                            document.querySelector('#edit-image-link').value = oldURL;
                            document.querySelector('#meme_id').innerHTML = id;
                            editing_form.classList.toggle('open');
                            hamburger_quit_editing.classList.toggle('clicked');
                        });
                    });
                })
                .fail(function (xhr, textStatus, errorThrown) {
                    $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
                })
        },
        create: function (meme) {
            let ajax_options = {
                type: 'POST',
                url: '/memes',
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(meme)
            };
            $.ajax(ajax_options)
                .done(function (data) {
                    $event_pump.trigger('model_create_success', [data]);

                    // Scroll to the meme just posted
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $("#browse-header").offset().top
                    }, 1000);
                })
                .fail(function (xhr, textStatus, errorThrown) {
                    $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);

                    // Alert the user that meme hasn't been posted as it exists
                    alert('The meme with similar owner, caption and url exists!');
                })
        },
        update: function (meme) {
            let ajax_options = {
                type: 'PATCH',
                url: `/memes/${meme.id}`,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(meme)
            };
            $.ajax(ajax_options)
                .done(function (data) {
                    $event_pump.trigger('model_update_success', [data]);
                })
                .fail(function (xhr, textStatus, errorThrown) {
                    $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);

                    // Alert the user that meme hasn't been updated as it exists
                    alert('The meme with similar owner, caption and url exists!');
                })
        },
    };
}());

// Create the view instance
ns.view = (function () {
    'use strict';

    let $username = $('#username'),
        $caption = $('#caption'),
        $image_link = $('#image-link');

    // return the API
    return {
        reset: function () {
            $username.val('');
            $caption.val('');
            $image_link.val('');
        },

        build_memes: function (memes) {
            let rows = ''

            // clear the div containing memes
            $('.all-memes').empty();

            // did we get a memes array?
            if (memes) {
                for (let i = 0, l = memes.length; i < l; i++) {
                    rows += `<div class="meme-container" id="meme${memes[i].id}">
                        <h1 class="name">${memes[i].name}</h1>
                        <p class="caption">${memes[i].caption}</p>
                        <img src="${memes[i].url}" alt="Meme #${memes[i].id}">
                        <button class="edit meme${memes[i].id}">Edit</button>
                    </div>`;
                }
                $('.all-memes').append(rows);
            }
        },
        error: function (error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function () {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function (m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $username = $('#username'),
        $caption = $('#caption'),
        $image_link = $('#image-link'),
        $id = $('#meme_id'),
        $edit_username = $('#edit-username'),
        $edit_caption = $('#edit-caption'),
        $edit_image_link = $('#edit-image-link');

    // Get the data from the model after the controller is done initializing
    setTimeout(function () {
        model.read();
    }, 100);

    // Validate input
    function validate(name, url) {
        return name !== "" && url !== "";
    }

    // Create our event handlers
    $('#create').click(function (e) {
        let name = $username.val(),
            caption = $caption.val(),
            url = $image_link.val();

        e.preventDefault();

        if (validate(name, url)) {
            model.create({
                'name': name,
                'caption': caption,
                'url': url
            });
        } else {
            alert('Please do not leave the name and url fields empty!');
        }
    });

    $('#update').click(function (e) {
        let name = $edit_username.val(),
            caption = $edit_caption.val(),
            url = $edit_image_link.val(),
            id = $id.html();

        e.preventDefault();

        if (validate("Non empty string", url)) {
            model.update({
                name: name,
                caption: caption,
                url: url,
                id: id
            });
        } else {
            alert('Please do not leave the url field empty!');
        }
    });

    // Handle the model events
    $event_pump.on('model_read_success', function (e, data) {
        view.build_memes(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function (e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function (e, data) {
        model.read();
    });

    $event_pump.on('model_error', function (e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
    })
}(ns.model, ns.view));

//======================== Backend \End =============================