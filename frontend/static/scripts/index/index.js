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