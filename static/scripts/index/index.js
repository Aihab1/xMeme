document.addEventListener('DOMContentLoaded', () => {

    //Toggling meme submission form from the post meme button
    const post_meme_button = document.querySelector('#post-meme-button');
    const meme_form = document.querySelector('#main-form');

    post_meme_button.addEventListener('click', () => {
        meme_form.classList.toggle('open');
        hamburger.classList.toggle('clicked');
    });

    //Toggling meme submission form from the hamburger
    const hamburger = document.querySelector('#hamburger');

    hamburger.addEventListener('click', () => {
        meme_form.classList.toggle('open');
        hamburger.classList.toggle('clicked');
    });

});


// // AJAX stuff

// // Create the namespace instance
// let ns = {};

// // Create the model instance
// ns.model = (function() {
//     'use strict';

//     let $event_pump = $('body');

//     // Return the API
//     return {
//         'read': function() {
//             let ajax_options = {
//                 type: 'GET',
//                 url: 'api/memes',
//                 accepts: 'application/json',
//                 dataType: 'json'
//             };
//             $.ajax(ajax_options)
//             .done(function(data) {
//                 $event_pump.trigger('model_read_success', [data]);
//             })
//             .fail(function(xhr, textStatus, errorThrown) {
//                 $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
//             })
//         },
//         create: function(meme) {
//             let ajax_options = {
//                 type: 'POST',
//                 url: 'api/memes',
//                 accepts: 'application/json',
//                 contentType: 'application/json',
//                 dataType: 'json',
//                 data: JSON.stringify(meme)
//             };
//             $.ajax(ajax_options)
//             .done(function(data) {
//                 $event_pump.trigger('model_create_success', [data]);
//             })
//             .fail(function(xhr, textStatus, errorThrown) {
//                 $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
//             })
//         },
//         update: function(meme) {
//             let ajax_options = {
//                 type: 'PUT',
//                 url: `api/memes/${meme.meme_id}`,
//                 accepts: 'application/json',
//                 contentType: 'application/json',
//                 dataType: 'json',
//                 data: JSON.stringify(meme)
//             };
//             $.ajax(ajax_options)
//             .done(function(data) {
//                 $event_pump.trigger('model_update_success', [data]);
//             })
//             .fail(function(xhr, textStatus, errorThrown) {
//                 $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
//             })
//         }
//     };
// }());

// // Create the view instance
// ns.view = (function() {
//     'use strict';

//     let $meme_id = $('#meme_id'),
//         $owner = $('#owner'),
//         $caption = $('#caption'),
//         $url = $('#url');

//     // return the API
//     return {
//         update_editor: function(meme) {
//             $meme_id.val(meme.meme_id);
//             $owner.val(meme.owner);
//             $caption.val(meme.caption);
//             $url.val(meme.url).focus();
//         },
//         build_table: function(memes) {
//             let rows = ''

//             // clear the table
//             $('.memes table > tbody').empty();

//             // did we get a memes array?
//             if (memes) {
//                 for (let i=0, l=memes.length; i < l; i++) {
//                     rows += `<tr data-meme-id="${memes[i].meme_id}">
//                         <td class="owner">${memes[i].owner}</td>
//                         <td class="caption">${memes[i].caption}</td>
//                         <td class="url">${memes[i].url}</td>
//                     </tr>`;
//                 }
//                 $('table > tbody').append(rows);
//             }
//         },
//         error: function(error_msg) {
//             $('.error')
//                 .text(error_msg)
//                 .css('visibility', 'visible');
//             setTimeout(function() {
//                 $('.error').css('visibility', 'hidden');
//             }, 3000)
//         }
//     };
// }());

// // Create the controller
// ns.controller = (function(m, v) {
//     'use strict';

//     let model = m,
//         view = v,
//         $event_pump = $('body'),
//         $meme_id = $('#meme_id'),
//         $owner = $('#owner'),
//         $caption = $('#caption');
//         $url = $('#url');

//     // Get the data from the model after the controller is done initializing
//     setTimeout(function() {
//         model.read();
//     }, 100)

//     // Validate input
//     function validate(owner, caption, url) {
//         return owner !== "" && url !== "";
//     }

//     // Create our event handlers
//     $('#create').click(function(e) {
//         let owner = $owner.val(),
//             caption = $caption.val(),
//             url = $url.val();

//         e.preventDefault();

//         if (validate(owner, caption, url)) {
//             model.create({
//                 'owner': owner,
//                 'caption': caption,
//                 'url': url,
//             })
//         } else {
//             alert('Problem with the input');
//         }
//     });

//     $('#update').click(function(e) {
//         let meme_id = $meme_id.val(),
//             owner = $owner.val(),
//             caption = $caption.val(),
//             url = $url.val();

//         e.preventDefault();

//         if (validate(owner, caption, url)) {
//             model.update({
//                 meme_id: meme_id,
//                 owner: owner,
//                 caption: caption,
//                 url: url,
//             })
//         } else {
//             alert('Problem with input');
//         }
//         e.preventDefault();
//     });

//     // Handle the model events
//     $event_pump.on('model_read_success', function(e, data) {
//         view.build_table(data);
//         view.reset();
//     });

//     $event_pump.on('model_create_success', function(e, data) {
//         model.read();
//     });

//     $event_pump.on('model_update_success', function(e, data) {
//         model.read();
//     });

//     $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
//         let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
//         view.error(error_msg);
//         console.log(error_msg);
//     })
// }(ns.model, ns.view));