const smartgrid = require('smart-grid');

const settings = {
    outputStyle: 'scss',
    columns: 24,
    offset: '10px',
    container: {
        maxWidth: '960px',
        fields: '10px'
    },
    breakPoints: {
        md: {
            width: "1000px",
            fields: "15px"
        },
        sm: {
            width: "768px",
            fields: "15px"
        },
        xs: {
            width: "576px",
            fields: "15px"
        },
        xxs: {
            width: "380px",
            fields: "15px"
        }
    },
    oldSizeStyle: false,
    properties: [
        'justify-content'
    ]
};

smartgrid('./src/precss', settings);