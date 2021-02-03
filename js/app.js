
searchApi('classes')
    .then( data => {
        for (const type in data) {
            const cName = type.name;
            console.log(type);
        }
    });
