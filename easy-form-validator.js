/**
 * jQuery Plugin - Form Validation
 * 
 * @author Adam Magaña
 * @since May 25th, 2011
 * @see http://docs.jquery.com/Plugins/Authoring
 */
(function($){
    
    $.fn.validate = function(options) {
        
        $.fn.validate.defaults = {
            //default settings go here
        };

        var settings = $.extend({}, $.fn.validate.defaults, options);
        
        return this.each(function(){
            $(this).find('*[data-validate]').each(function() {
                var validation = $(this).data('validate').split(/\s/);
                
                for(var i=0, j=validation.length; i<j; i++) {
                    var current = validation[i];
                    if(current in $.fn.validate.validationHooks && typeof $.fn.validate.validationHooks[current] === "function") {
                        if(true === $.fn.validate.validationHooks[current].apply(this, [$(this).val()])) {
                            console.log($(this).attr('name')+' validated!');
                        }else {
                            console.log($(this).attr('name')+' did not validate!');
                        }
                    }
                }
            });
        });
    };
    
    $.fn.validate.validationHooks = {
        required:function(val) {
            return true;
        },
        alpha:function(val) {
            return true;
        },
        numeric:function(val) {
            return true;
        },
        email:function(val) {
            var regexp = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            if(regexp.test(val)) {
                return true;
            }else {
                return false;
            }
        },
        url:function(val) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if(regexp.test(val)) {
                return true;
            }else {
                return false;
            }
        }
    };
})(jQuery);
