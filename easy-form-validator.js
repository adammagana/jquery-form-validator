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


/*
for(var j = 0;j < validation.length;j++) {
    switch(validation[j]) {
        case 'required':
            //make sure the the value is not null
            if(input_value === '') {
                errors.push('This field is required.');
                input.css({
                    'background-color':'#f26c4f'
                });
            }
            break;
        case 'alpha':
            //check that the value is only alphanumeric characters
            break;
        case 'numeric':
            //check that the value is only numeric characters
            if(isNaN(parseInt(input_value, 10))) {
                errors.push('Not a valid number.');
                input.css({
                    'background-color':'#f26c4f'
                });
            }
            break;
        case 'email':
            //do email validation
            var regexp = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            if(regexp.test(input_value)) {
                //passed the email validation
            }else {
                errors.push('Email is not valid.');
                input.css({
                    'background-color':'#f26c4f'
                });
            }
            break;
        case 'url':
            //do url validation
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if(regexp.test(input_value)) {
                //passed the email validation
            }else {
                errors.push('URL is not valid.');
                input.css({
                    'background-color':'#f26c4f'
                });
            }
            break;
        default:
            //console.log(input, 'Validation type not recognized!');
            break;
    }
}
*/