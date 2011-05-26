/**
 * jQuery Plugin - Form Validation
 * 
 * @author Adam Magaña
 * @since May 25th, 2011
 * @see http://docs.jquery.com/Plugins/Authoring
 */
(function($){
    $.fn.validate = function() {
        var errors = [];
        var text_inputs = this.find('input[data-validate][type="text"]'); //selects all text fields with a 'data-validate' attr
        
        if(text_inputs.length >= 1) {
            for(var i = 0;i < text_inputs.length;i++) {
                var input = $(text_inputs[i]);
                var input_value = input.val();
                var validate = input.data('validate');
                
                var validation = [];
                validation = validate.split(' ');
                
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
            }
        }
        
        //If the errors array is empty return true, else return the array of errors
        return (errors.length === 0) ? true : errors;
    };
})(jQuery);