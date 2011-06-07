/**
 * jQuery Plugin - Form Validation
 * 
 * @author Adam Magaña
 * @since May 25th, 2011
 * @see http://docs.jquery.com/Plugins/Authoring
 */
(function($){
    
    $.fn.validate = function(options) {
        /**
        * Object Literal that defines the default settings of the plugin
        */
        $.fn.validate.defaults = {
            invalid:function() {
                //console.log($(this).attr('name')+' did not validate!');
            },
            success:function() {
                console.log("The FORM is VALID!");
            },
            error:function(errors) {
                console.log("The FORM is NOT VALID!");
                console.log(errors);
            }
        };
        
        /**
        * Merge the $.fn.validate.defaults with any user-defined settings
        */
        var settings = $.extend({}, $.fn.validate.defaults, options);
        
        return this.each(function(){
            var invalidFields = [];
            
            $(this).find('*[data-validate]').each(function() {
                var validation = $(this).data('validate').split(/\s/);
                
                for(var i=0, j=validation.length; i<j; i++) {
                    var current = validation[i];
                    if(current in $.fn.validate.validationHooks && typeof $.fn.validate.validationHooks[current] === "function") {
                        /**
                        * If the field passes the validation then pass
                        * Else call the settings.invalid function
                        */
                        if(true === $.fn.validate.validationHooks[current].apply(this, [$(this).val()])) {
                            //pass for now
                        }else {
                            invalidFields.push(this);
                            settings.invalid.apply(this);
                        }
                    }
                }
            });
            
            /**
            * If errors were not found then call the settings.success function
            * Else call the settings.error function
            */ 
            if(invalidFields.length === 0) {
                settings.success();
            }else {
                settings.error(invalidFields);
            }
        });
    };
    
    /**
    * Object Literal that defines the validation types and their corresponding functions
    */
    $.fn.validate.validationHooks = {
        required:function(val) {
            //Check the type of the input
            switch(this.tagName) {
                case 'INPUT':
                    if($(this).attr('type') == 'text') {
                        $.trim(val);
                        if(val === '') {
                            return false;
                        }else {
                            return true;
                        }
                    }else if($(this).attr('type') == 'checkbox') {
                        return $(this).is(':checked') ? true : false;
                    }
                    break;
                default:
                    return false;
                    break;
            }
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
