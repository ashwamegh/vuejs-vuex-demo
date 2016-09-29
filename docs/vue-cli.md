# Using vue-cli for quick project scaffolding

Simple projects don't need more then some HTML, CSS and javascript but soon enough you will run into problems with asset management, minification, module bundling, linting, testing, etc...

Luckily there is a simple Command line tool called [vue-cli](https://github.com/vuejs/vue-cli) that you can use to quickly scaffold a new project with all the bells and whistles that modern web developers use.

You can install it globally with NPM
```bash
npm install -g vue-cli
```

Then all you would need to do is run the command below. You will be able to customize your setup with some yes/no questions.
```bash
vue init <template> <name>
```

**NOTE!**
Vue-cli support different so called templates to scaffold your project. In this workshop we will be using the `webpack` template but if you prefer another module bundler like `browserify` there is a template for that as well.
