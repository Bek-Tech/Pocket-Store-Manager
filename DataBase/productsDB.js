import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('products.db');

export const initProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, date TEXT NOT NULL, name TEXT NOT NULL UNIQUE,  stock REAL NOT NULL, history BLOB, color TEXT, status TEXT,description TEXT, image TEXT, category TEXT, salePrice REAL, costPrice REAL ,measureType TEXT  );',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            )
        })

        //  ______________query for adding new columns
        // ______________can`t use  IF NOT EXISTS  , if  colum exists it gives an error when it runs query  
        //  TODO make function which only runs this query once after  app gets  new update  

        // db.transaction(tx => {
        //     tx.executeSql(
        //         'ALTER TABLE products ADD COLUMN   test3 TEXT',
        //         'ALTER TABLE products ADD COLUMN  test2 TEXT,',
        //         [],
        //         () => {
        //             resolve();
        //         },
        //         (_, err) => {
        //             // alert("error ")
        //             reject(err);
        //         }
        //     );
        // });


    });
    return promise;
};



export const insertProduct = (date, name, stock, history, color) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO products (date, name, stock, history,color,status) VALUES ( ?, ?, ?,?,?,?);`,
                [date, name, stock, history, color, "active"],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has ocurred !")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM products GROUP BY id   HAVING status LIKE "active" ORDER BY id DESC `,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchDeletedProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id, date, name, stock,history,color, status FROM products GROUP BY id  HAVING status LIKE "inactive" ORDER BY id DESC `,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};



export const totallyDeleteProduct = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE products SET   name= "deleted${id}",  date= "deleted" , stock= 0 , history='[]' , status = "deleted" WHERE id =${id}`,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const updateProduct = (id, date, name, stock, history, color) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE products SET  name= "${name}",  date= "${date}" , stock=${stock} , history='${history}',color="${color}" WHERE id =${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};


export const deleteProduct = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE products SET status = "inactive" WHERE id =${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const updateProductStatus = (id, status) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE products SET status = "${status}" WHERE id =${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

