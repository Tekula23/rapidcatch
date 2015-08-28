(function ($) {

  // Do nothing if we already have a form on the page
  if($('#rapidcatchForm').length > 0) return;
  // Do nothing if there's no bid field on the page
  if($('input[name="maxbid"]').length == 0) return;

  chrome.extension.sendRequest({}, function(response) {});

  var itemId = new RegExp('[0-9]{12}', 'ig').exec(document.location);

  $('<div />').addClass('is').css({ overflow: 'hidden', marginBottom: '15px' }).insertBefore($('.is')).html('                       \
    <form action="http://v2.rapidcatch.com/auctions/add/" method="post" id="rapidcatchForm">                                           \
      <div class="actPanel">                                                                                                        \
        <div class="u-cb spcr"></div>                                                                                               \
        <div class="u-cb">                                                                                                          \
          <div class="u-flL lable pdT4" style="font-weight: bold; color: #ff7012;">Rapidcatch:</div>                                \
          <div class="u-flL u-b w29"><input class="MaxBidClass" type="text" size="11" maxlength="10" name="bid" value="" /></div>   \
          <div class="u-flL"><a class="vib bl" href="" vib="vib" id="rapidcatchAdd">' + chrome.i18n.getMessage('add') +'</a></div>  \
        </div>                                                                                                                      \
        <div class="u-cb spcr"></div>                                                                                               \
        <input name="mauction[]" type="hidden" value="' + itemId + '">                                                              \
        <input name="chrome-ext" type="hidden" value="1">                                                                           \
      </div>                                                                                                                        \
    </form>                                                                                                                         \
  ');

  $('#rapidcatchAdd').click(function(event){
    event.preventDefault();
    $('#rapidcatchForm').submit();
  });

})(jQuery);
