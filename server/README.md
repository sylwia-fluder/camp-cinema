
Endpoints:

    Movie:
        Get all movies              -> /api/movies/
        Get movie by id             -> /api/movies/:id
        Get movie by title          -> /api/movies/browserTitle/:title

        Post movie                  -> /api/movies/

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

    Screening:
        Get all screenings          -> /api/screenings
        Get screening by id         -> /api/screenings/:id
        Get all screenings by title -> /api/screenings/browserTitle/:title

        Post screening              -> /api/screenings/

            Body {
                movieId: objectId,
                priceNormalTicket: number,
                typeOfScreening: string     (default = "2D", enum -> ['2D','3D','4D']),
                language: string            (default = "PL", enum -> ['PL','EN (SUB PL)', 'DUB PL','Original', 'Original (SUB PL)']),
                date: Date,
            }
        Put screening by id           -> /api/screenings/:id
        
            Body {
                (optional)
                priceNormalTicket: number,
                typeOfScreening: string     (enum -> ['2D','3D','4D']),
                language: string            (enum -> ['PL','EN (SUB PL)', 'DUB PL','Original', 'Original (SUB PL)']),
                date: Date,
            }
        