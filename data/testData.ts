export const testData = {
    baseUrl: 'https://www.saucedemo.com/',
    users: {
        standard: { username: 'standard_user', password: 'secret_sauce' },
        lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
        invalid: { username: 'invalid_user', password: 'invalid_password' }
    },
    checkoutInfo: {
        valid: { firstName: 'John', lastName: 'Doe', postalCode: '12345' },
        specialChars: { firstName: 'John@#$%', lastName: "O'Brien", postalCode: '12345' },
        longInput: { 
            firstName: 'JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn', 
            lastName: 'DoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoe', 
            postalCode: '123456789' 
        }
    },
    products: {
        backpack: { name: 'Sauce Labs Backpack', price: '$29.99' },
        bikeLight: { name: 'Sauce Labs Bike Light', price: '$9.99' },
        boltTShirt: { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' },
        fleeceJacket: { name: 'Sauce Labs Fleece Jacket', price: '$49.99' },
        onesie: { name: 'Sauce Labs Onesie', price: '$7.99' }
    }
};
