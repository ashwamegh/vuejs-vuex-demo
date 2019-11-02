/* WE USE GETTER FUNCTIONS TO RETURN THE STATE TO OUR COMPONENTS. */
/**
 * It is an abstraction over the access of state and if we would like 
 * to change the structure of our state then we would only need to update 
 * our getters and not every component that uses it.
 */

export const getProducts = state => state.all