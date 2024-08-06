

//import interfaces
const getResults = async (searchTerm: string) => {
    try {
        const response = await fetch(`https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/v1/books?search=${searchTerm}`,
            {
              method: 'GET',
              redirect: 'follow'
            }
        );
        if (!response.ok) {
            const status = response.status;
            console.log(status);
            throw new Error(`Couldn't get search results - ${status}`)
        }
        return await response.json();
    } catch(error: any) {
        console.log("API CALLS catch block - search results", error);
        throw error;
    }
}
const getRecs = async (category: string) => {
    try {
        const response = await fetch(`https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/v1/books?search=${category}`,
            //replace url once available in mock server
            {
              method: 'GET',
              redirect: 'follow'
            }
        );
        if (!response.ok) {
            const status = response.status;
            console.log(status);
            throw new Error(`Couldn't get recommendations - ${status}`)
        }
        return await response.json();
    } catch(error: any) {
        console.log("API CALLS catch block - recommendations", error);
        throw error;
    }
}

const getBook = async (bookID: string | undefined) => {
    try {
        const response = await fetch(`https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/v1/books/${bookID}`,
            {
              method: 'GET',
              redirect: 'follow'
            }
        );
        if (!response.ok) {
            const status = response.status;
            console.log(status);
            throw new Error(`Couldn't get the book - ${status}`)
        }
        return await response.json();
    } catch(error: any) {
        console.log("API CALLS catch block - get book", error);
        throw error;
    }
}

const getShelves = async (userID: string | undefined = "106196942824430802445") => {
    // userID = "106196942824430802445";
    try {
        const response = await fetch(`https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/${userID}/bookshelves`,
            {
              method: 'GET',
              redirect: 'follow'
            }
        );
        if (!response.ok) {
            const status = response.status;
            console.log(status);
            throw new Error(`Couldn't get the shelves - ${status}`)
        }
        return await response.json();
    } catch(error: any) {
        console.log("API CALLS catch block - get shelves", error);
        throw error;
    }
}

const getShelf = async (userID: string | undefined, shelfID: string | undefined) => {
    userID = "106196942824430802445";
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        } as const;
        const shelf = fetch(`https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/${userID}/bookshelves/${shelfID}`,
            requestOptions);
        const books = fetch(`https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/${userID}/bookshelves/${shelfID}/books`,
            requestOptions);
        const responses = await Promise.all([shelf, books]);
        if (!responses.every(response => response.ok)) {
            throw new Error(`Couldn't get the shelf data`)
        }
    
        // console.log(bookData.json())
        // return await 
        return await Promise.all(responses.map(res => res.json()))

    } catch (error: any) {
        console.log("API CALLS catch block - get shelf", error);
    }
}

// const getShelfBooks = async (userID: string | undefined, shelfID: string | undefined) => {
//     userID = "106196942824430802445";
//     try {
//         const response = await fetch(`https://5ed7ccd5-b752-4d30-bd73-96ddec3fba58.mock.pstmn.io/api/vi/users/${userID}/bookshelves/${shelfID}/books`,
//             {
//               method: 'GET',
//               redirect: 'follow'
//             }
//         );
//         if (!response.ok) {
//             const status = response.status;
//             console.log(status);
//             throw new Error(`Couldn't get the shelf's books - ${status}`)
//         }
//         return await response.json();
//     } catch(error: any) {
//         console.log("API CALLS catch block - get shelf books", error);
//         throw error;
//     }
// }



export {
    getResults,
    getRecs,
    getBook,
    getShelves,
    getShelf,
    // getShelfBooks
}