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
            fieldError:function(error) {
                //Handles an error on an invididual field
            },
            success:function() {
                //Handles a success on an entire form
            },
            error:function(errors) {
                //Handles an error on an entire form
            }
        };
        
        /**
        * Ternary assignment to 'settings':
        * 
        * If 'options' variable is an object then merge it with '$.fn.validate.defaults'
        * Else return '$.fn.validate.defaults'
        */
        var settings = (typeof options === "object") ? $.extend({}, $.fn.validate.defaults, options) : $.fn.validate.defaults;
        
        return this.each(function() {
            //Automatically bind a submit event to each form
            $(this).submit(function(e){
                var invalidFields = [];
                $(this).find('*[data-validate]').each(function() {
                    $(this).removeClass('error');
                    
                    var validation = $(this).data('validate').split(/\s/);
                    for(var i=0, j=validation.length; i<j; i++) {
                        var current = validation[i];
                        if(current in $.fn.validate.validationHooks && typeof $.fn.validate.validationHooks[current].set === "function") {
                            /**
                            * If the field passes the validation then pass
                            * Else add the validation error to the invalidFields array and call the settings.fieldError function
                            */
                            if(true === $.fn.validate.validationHooks[current].set.apply(this, [$(this).val()])) {
                                //pass for now
                            }else {
                                var error = ($.fn.validate.validationHooks[current].message === undefined) ? "This field is required." : $.fn.validate.validationHooks[current].message;
                                invalidFields.push({
                                    selector: this,
                                    message: error
                                });
                                settings.fieldError.apply(this, [error]);
                            }
                        }
                    }
                });

                /**
                * If errors were not found then call the 'settings.success' function
                * Else prevent the form from submitting and call the 'settings.error' function
                */ 
                if(invalidFields.length === 0) {
                    e.preventDefault();
                    settings.success.apply(this);
                }else {
                    e.preventDefault();
                    settings.error.apply(this, [invalidFields]);
                }
            });
        });
    };
    
    /**
    * Object Literal that defines the validation types
    * 
    * Modeled after cssHooks, each validation type has two properties: a 'set' property and a 'message' property.
    * The 'set' property is the actual function that validates a field. The 'message' property is the error message that
    * is returned to the 'settings.fieldError' function when validation fails.
    */
    $.fn.validate.validationHooks = {
        required:{
            set:function(val) {
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
            message:'This field is required.'
        },
        
        alpha:{
            set:function(val) {
                return true;
            },
            message:'This field can contain only letters.'
        },
        
        numeric:{
            set:function(val) {
                return (val - 0) == val && val.length > 0;
            },
            message:'This field can contain only numbers.'
        },
        
        email:{
            set:function(val) {
                var regexp = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
                if(regexp.test(val)) {
                    return true;
                }else {
                    return false;
                }
            },
            message:'Not a valid email.'
        },
        
        url:{
            set:function(val) {
                var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                if(regexp.test(val)) {
                    return true;
                }else {
                    return false;
                }
            },
            message:'Not a valid URL.'
        }
    };
    
    /**
    * Map $.fn.validate.validationHooks to $.validationHooks if it is undefined.
    */
    $.validationHooks = ($.validationHooks === undefined) ? $.fn.validate.validationHooks : $.validationHooks;
})(jQuery);
