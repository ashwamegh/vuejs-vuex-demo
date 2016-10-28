# Creating your first Vue.js project

Let's start off easy with the mandatory "hello world" example.
Create an `index.html` file in `exercise-files/first-app` with the following code.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello world!</title>
  <!-- include Vue.js from a CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.min.js"></script>
  <script>
    // wait until the DOM specified in <body> has loaded before executing the
    // function, if you have ever used jQuery $(document).ready() it is
    // basically the same thing.
    document.addEventListener('DOMContentLoaded', function () {
      // create a new Vue.js instance and specify the template as well as the
      // data that should be displayed in it.
      new Vue({
        el: '#app',
        data: {
          message: 'Hello World!'
        }
      })
    })
  </script>
</head>
<body>
  <div id="app">
    {{ message }}
  </div>
</body>
</html>
```

Open the file in your browser and watch the magic happen!

That is all we need to create a new Vue.js application and separate the presentation from the data.

Although you most certainly will build more complex apps than this I wanted to show you how easy it is to get started because this is really one of the things I like about Vue.js compared to other frameworks. The ability to start small and only adding complexity as you need it with officially supported add-ons like vue-router and vuex.
