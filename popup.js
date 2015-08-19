jQuery(function () {
  var form    = jQuery('#form');
  var spinner = jQuery('#spinner');
  var message = jQuery('#message');
  var price   = jQuery('#price');
  var submit  = jQuery('#submit');
  var link    = jQuery('#link');

  link.text(chrome.i18n.getMessage("about"));
  submit.text(chrome.i18n.getMessage("place_bid"));

  spinner.hide();
  message.hide();

  form.bind("submit", function (event) {
    event.preventDefault();
    form.hide();
    spinner.show();
    var priceValue = price.val();
    if(priceValue == "") priceValue = 0;
    chrome.extension.sendRequest({price: priceValue}, function (response) {
      spinner.hide();
      message.show();
      message.text(chrome.i18n.getMessage("request_status_" + response.message));
      if(response.message != "success") {
        message.addClass("error");
      }
    });
  });

});
