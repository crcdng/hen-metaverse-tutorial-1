
AFRAME.registerComponent('henlink', {
  schema: { url: { type: 'string' } },
  init: function () {
    console.log('registering component henlink');
  },
  update: function () {
    const url = this.data.url;
    this.el.addEventListener('click', function (evt) {
      window.open(url, '_blank');
    });
  }
});
