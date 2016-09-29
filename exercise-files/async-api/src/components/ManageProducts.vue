<template>
  <save-product-form
    :product="productInForm"
    v-on:submit="onFormSave"
    v-on:cancel="resetProductInForm"
  ></save-product-form>
  <product-list
    :products="products"
    v-on:edit="onEditClicked"
    v-on:remove="onRemoveClicked"
  ></product-list>
</template>

<script>
import { getProducts } from '../vuex/getters';
import { saveProduct, deleteProduct } from '../vuex/actions';
import ProductList from './ProductList';
import SaveProductForm from './SaveProductForm';

const initialData = () => {
  return {
    productInForm: {
      id: null,
      name: '',
      description: '',
      price: null
    }
  }
}

export default {
  components: {
    ProductList,
    SaveProductForm
  },
  data: initialData,
  vuex: {
    actions: {
      saveProduct,
      deleteProduct
    },
    getters: {
      products: getProducts
    }
  },
  methods: {
    onFormSave() {
      // clone the productInForm object
      const product = { ...this.productInForm };

      this.saveProduct(product);

      this.resetProductInForm();
    },
    resetProductInForm() {
      this.productInForm = initialData().productInForm;
    },
    onEditClicked(product) {
      this.productInForm.id = product.id;
      this.productInForm.name = product.name;
      this.productInForm.description = product.description;
      this.productInForm.price = product.price;
    },
    onRemoveClicked(product) {
      this.deleteProduct(product);

      if (product.id === this.productInForm.id) {
        this.resetProductInForm();
      }
    }
  }
}
</script>
