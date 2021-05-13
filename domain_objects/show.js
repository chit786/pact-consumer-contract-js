class Show {
    constructor(title, rating) {
        this.title = title;
        this.rating = rating;
    }

    static validateTitle(show) {
        if (typeof show.title !== 'string') {
            throw new Error(`Show title must be a string! Invalid value: ${show.title}`);
        }
    }

    static validateRating(show) {
        if (typeof show.rating !== 'number') {
            throw new Error(`Show rating must be a number! Invalid value: ${show.rating}`)
        }
    }
}

export default Show;
