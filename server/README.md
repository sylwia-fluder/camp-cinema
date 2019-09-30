
Endpoints:

    Movie:
        Get all movies      -> /api/movies/
        Get movie by id     -> /api/movies/:id
        Get movie by title  -> /api/movies/browserTitle/:title

        Post movie          -> /api/movies/

            Body {
                title: String,  
                genre: String,
                ageLimit: Number,           (optional)
                runningTime: Number,        (optional)
                movieDescription: String,   (optional)
                direction: String,          (optional)
                cast: Array,                (optional)
                production: String,         (optional)
                releaseDate: Date,          (optional)
                posterURL: String,          
            }
        
