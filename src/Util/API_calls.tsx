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
const getShelves = async (userID: string | undefined) => {
    userID = "106196942824430802445";
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

export {
    getResults,
    getBook,
    getShelves
}