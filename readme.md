#Easy HTML Form Validator
*A jQuery Plugin*

##Description
**Author**: Adam Magaña &lt;adammagana@gmail.com&gt;  
**Last Edit**: March 1st, 2012  
**Version**: 0.0.1

##Usage

**Basic usage:**

The `data-validate` attribute on input fields is required.
```html
<form>
    <input type="text" data-validate="required" name="required-validation" />
    <input type="text" data-validate="email" name="email-validation" />
    <input type="text" data-validate="url" name="url-validation" />
    <input type="text" data-validate="numeric" name="numeric-validation" />
    <input type="checkbox" data-validate="required" name="checkbox-validation" />
</form>

<script type="text/javascript">
    $(document).ready(function(){
        $('form').validate();
    });
</script>
```

**Usage with custom callback functions:**

The `data-validate` attribute on input fields is required.
```html
<form>
    <input type="text" data-validate="required" name="required-validation" />
    <input type="text" data-validate="email" name="email-validation" />
    <input type="text" data-validate="url" name="url-validation" />
    <input type="text" data-validate="numeric" name="numeric-validation" />
    <input type="checkbox" data-validate="required" name="checkbox-validation" />
</form>

<script type="text/javascript">
    $(document).ready(function(){
        $('form').validate({
            fieldError:function() {
                //Called when validation fails on an individual field
            },
            error:function(errors) {
                //Called when validation completes and validation errors are found
            },
            success:function() {
                //Called when validation completes and no validation errors are found
            }
        });
    });
</script>
```
##License 

(The MIT License)

Copyright (c) 2011 Adam Magaña &lt;adammagana@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.