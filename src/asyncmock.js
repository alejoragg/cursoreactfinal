const products = [
    { 
        id: '1', 
        name: 'Casa en Av Santa Rosa', 
        price: 1000, 
        category: 'celular', 
        photos: [
            {
                "description": null,
                "thumb": "https://static.tokkobroker.com/thumbs/5944349525841003867993743815595423470964961955127610236548786609981486517954_thumb.jpg"
                },
                {
                "description": null,
                "thumb": "https://static.tokkobroker.com/thumbs/49972085924615321011620355387827315030762708253776622689564234278159639360948_thumb.jpg"
            }
        ], 
        stock: 23, 
        description:'Casa en Venta en zona residencial'
    },
    { 
        id: '2', 
        name: 'Departamento ubicado en Zona Centro', 
        price: 2000, 
        category: 'celular', 
        photos: [
            {
                "description": null,
                "thumb": "https://static.tokkobroker.com/thumbs/84017776470658466175815959154571959627725979095788503588757585432354201435760_thumb.jpg"
                },
                {
                "description": null,
                "thumb": "https://static.tokkobroker.com/thumbs/85958281128910880811637796129685844782769627166473557492542527044405823698782_thumb.jpg"
                },
        ], 
        stock: 18, 
        description:'Casa en Venta en zona residencial',
    },
    { 
        id: '3', 
        name: 'Casa en Pilar', 
        price: 3000, 
        category: 'tablet', 
        photos: [
            {
                "description": null,
                "thumb": "https://static.tokkobroker.com/pictures/40273071927353561159360369252282607899237161091464218517557107055130168173056.jpg"
                },
                {
                "description": null,
                "thumb": "https://static.tokkobroker.com/pictures/90625025690246488956594351794690923741127770159695805630408727006716457603258.jpg"
                },
                {
                "description": null,
                "thumb": "https://static.tokkobroker.com/pictures/72656894418745754001668501802184271902767213876889528347575089367520785456196.jpg"
                }
        ], 
        stock: 5, 
        description:'Casa en Alquiler, muy amplia e iluminada'
    }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 2000)
    })
}

export const getProductsById = (id) => {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === id))
        }, 2000)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 2000)
    })
}