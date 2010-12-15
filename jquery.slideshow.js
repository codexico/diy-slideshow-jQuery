(function ($) {
  //http://starter.pixelgraphics.us/
  $.slideshow = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    // Add a reverse reference to the DOM object
    base.$el.data("slideshow", base);

    base.init = function(){
      //junta as opcoes default com as passadas na chamada do plugin
      base.options = $.extend({},$.slideshow.defaultOptions, options);

      //um nome mais pratico para base.$el
      $slideshow = base.$el;
      //inicialmente esconde os slides
      $slideshow.find("li.slide").hide();
      //encontra o prmeiro slide e ativa-o
      $slideativo = $slideshow.find("li.slide").first().addClass('slideatual').css("left","0").show();

      base.proximo();
      base.anterior();
    };

    base.proximo = function(paramaters){
      //ao clicar mostra o proximo slide
      $('#slideproximo').click(function(){
        //esconde o slide atual para a direita
        $slideativo.animate({
          "left": "+="+$slideativo.outerWidth(),
          "opacity": "0"
        }, "slow");
        //procura o proximo
        $slideativo = $slideshow.find("li.slideatual").next();
        if(!$slideativo.size()) $slideativo = $slideshow.find("li.slide").first();//volta ao primeiro

        //remove o marcador do slide anterior
        $slideshow.find("li.slideatual").removeClass("slideatual");

        //posiciona na esquerda
        $slideativo.show().css("left", $slideativo.outerWidth()*-1).css('opacity', '0');
        //coloca o marcador e mostra
        $slideativo.addClass("slideatual").animate({
          "left": "0",
          "opacity": "1"
        }, "slow");
      });
    };

    base.anterior = function(paramaters){
      //ao clicar mostra o slide anterior
      $('#slideanterior').click(function(){
        //esconde o slide atual para a esquerda
        $slideativo.animate({
          "left": "-="+$slideativo.outerWidth(),
          "opacity": "0"
        }, "slow");
        //procura o proximo
        $slideativo = $slideshow.find("li.slideatual").prev();
        if(!$slideativo.size()) $slideativo = $slideshow.find("li.slide").last();//volta ao ultimo

        //remove o marcador do slide anterior
        $slideshow.find("li.slideatual").removeClass("slideatual");

        //posiciona na direita
        $slideativo.show().css("left", $slideativo.outerWidth()).css('opacity', '0');
        //coloca o marcador e mostra
        $slideativo.addClass("slideatual").animate({
          "left": "0",
          "opacity": "1"
        }, "slow");
      });
    };

    // Run initializer
    base.init();
  };

  $.slideshow.defaultOptions = {
  //colocar aqui opcoes default
  };

  $.fn.slideshow = function(options){
    return this.each(function () {
      (new $.slideshow(this, options));
    });
  };
})(jQuery)