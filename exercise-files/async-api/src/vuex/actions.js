import guid from 'guid';

import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from './mutation-types';

export function saveProduct({ state, dispatch }, product) {
  const index = state.products.all.findIndex((p) => p.id === product.id);

  // update product if it exists or create it if it doesn't
  if (index !== -1) {
    dispatch(UPDATE_PRODUCT, product)
  } else {
    product.id = guid.raw();
    dispatch(CREATE_PRODUCT, product)
  }
}

export function deleteProduct ({ state, dispatch }, product) {
  dispatch(DELETE_PRODUCT, product)
}
