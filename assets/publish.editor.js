(function($, Editor, undefined) {
    'use strict';

    if (typeof Editor === undefined) {
        throw new Error('Editor must be loaded beforehand this plugin');
    }

    $.fn.editorify = function (options) {
        options = options || {};
        return this.each(function (index, element) {
            var $element = $(element);
            var height = $element.height();
            var editor;
            options.element = element;
            editor = new Editor(options);
            $element.data('editor', editor);
            editor.render();
            $element.nextAll('.CodeMirror').css('height', height);
        });
    };

}(this.jQuery, this.Editor));

(function($, undefined) {
    'use strict';

    $(function() {
        $('textarea[class*="markdown"], textarea[class*="commonmark"]').editorify();

        // replace uploaded asset link text with Markdown image syntax
        var uploadFields = $('.field-upload:not(.required)'); // get uploads, excluding the required thumbnail
        uploadFields.each(function() {
            var hasUploaded = ($(this).find('span.frame span').length > 0);
            if (hasUploaded) {
                $(this).find('a').html($(this).find('a').html().replace($(this).find('a').text(),''));

                // contents().filter(function(){
                //     return (this.nodeType == 3);
                // }).remove();
                var path = $(this).find('input').attr('value');
                $(this).find('.frame').append('<div style="clear: both; cursor: text; padding: 0.2em 0.2em 0.2em 0;">![](' + path + ')</div>');
            }
        });

    });
}(this.jQuery));
