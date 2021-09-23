

In your `index.html`, add the line `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">` after the line that starts with `<script src`. This adds a library to format our text field.

<script src="https://unpkg.com/aframe-text-geometry-component@^0.5.1/dist/aframe-text-geometry-component.min.js"></script>

https://github.com/supermedium/superframe/tree/master/components/text-geometry

AFRAME.registerComponent('balance', {
  schema: {},
  init: function () {
    console.log('registering component balance');
  },
  update: function () {
    this.el.addEventListener('click', async function (evt) {
      console.log('click on component balance');
      const balance = await app.getBalance();
      const textGeometryAttribute = `value: ${balance} Tz; font: #comic-sans-bold`;
      document.querySelector('#balance').setAttribute('text-geometry', textGeometryAttribute);
      console.log(balance);
    });
  }
});


aframe-text-geometry-component
<link
rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
/>


    Optional part:
[Materialize CSS](https://materializecss.com)


```html
<div id="enteraddress" class="modal">
  <div class="modal-content">
    <h4>Tezos Address</h4>
    <p>
      Enter your Tezos wallet address and click on the sphere to see your
      balance. Click on the image to open it's H=N OBJKT page.
    </p>
    <input id="address" type="text" class="validate" />
    <label class="active" for="address">Tezos address</label>
  </div>
  <div class="modal-footer">
    <a
      href="#!"
      id="enteradddress"
      class="modal-close waves-effect waves-green btn-flat"
      >Enter</a
    >
  </div>
</div>
```


```html
<div id="henwindow" class="modal" width="600" height="400">
  <div class="modal-content">
    <iframe id="henframe" src="" title="" width="600" height="400"></iframe>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
  </div>
</div>
```