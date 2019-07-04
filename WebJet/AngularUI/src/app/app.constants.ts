export const AppConstants = Object.freeze({
    DISPLAYED_MOVIES_COLUMNS : ['CinemaWorldId', 'FilmWorldId', 'Title', 'Year', 'Type', 'Poster', 'Price'],
    DISPLAYED_MOVIE_COLUMNS : ['ID', 'MovieService', 'Price'],
    MOVIE_SERVICES : [
        {
            API_PATH: 'cinemaworld',
            ID_VARIABLE: 'CinemaWorldId',
            STATUS_VARIABLE: 'cinemaWorldLoadStatus',
            TITLE: 'Cinema World'
        },
        {
            API_PATH: 'filmworld',
            ID_VARIABLE: 'FilmWorldId',
            STATUS_VARIABLE: 'filmWorldLoadStatus',
            TITLE: 'Film World'
        }
    ],
    API_URL : {
      BASE: 'http://localhost:44326/api/',
        MOVIES: 'movies/',
        TOKEN: 'token',
        AUTHORIZE: 'auth/authorize'
    },
    BLANK_IMG_PATH: '../../assets/images/BlankMovieImage.png',
    RELOAD_SERVICE_TIMEOUT: 5000, // 5 second timeout for returned error from server
    HTTP_BODY_REQUEST: 'grant_type=password'
});
