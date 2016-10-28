# Congratulations!

You have now completed the Vue.js workshop. Hopefully you now have some understanding of how and when to use the Vue.js framework and some of its plugins. If you want to go the extra mile then here is a list of some additional ideas that you can implement on your own. Some of these have been implemented in the `/demo` folder if you want some inspiration on how you can solve these problems.

 * Add the ability to upload and display an image.

   **HINT!** There already exist an API endpoint for this `/products/upload` where you will send your image as multipart/form-data with an additional `product_id` field with the id of the product to relate the image to. So it will be a two-step process where you first create/update your product and after the promise has resolved you make another request to the `/products/upload` endpoint with the image and the retrieved product id.
 * Build a shopping cart module that you can add and remove products from.

	 **HINT!** Create a new vuex module that contains all products in the shopping cart. Only pass the product information that is necessary for the shopping cart to work. e.g. id, name, price.
 * Complete the `ProductCatalog` component so that you can add products to your shopping cart.
 * Display a loading indicator while the products is being fetched.

   **HINT!** You can commit a loading event to the store before the actual request is sent and when the request has finished you update the loading state to false.
 * Apply a transition when inserting a new product into the `ProductList`
 * Serve the app from a backend server with the initial state already injected so that the browser doesn't have to make an additional request to fetch the data.
 * Add filtering and sorting to the `ProductList`

   **HINT!** Use a computed property that returns a filtered and sorted list.
