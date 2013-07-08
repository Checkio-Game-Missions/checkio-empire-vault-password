//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide[data[1]] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(112);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }
            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(data.referee) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var checkioInput = data.ext["input"];
            var rightResult = data.ext["answer"];
            var userResult = data.req;
            var result = data.ext["result"];

            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + ext.JSON.encode(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + ext.JSON.encode(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + ext.JSON.encode(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            //Your code here about test explanation animation
            var flag_l = false;
            var flag_u = false;
            var flag_d = false;
            var password_word_html = function(){
                var res = '';
                for (var i = 0; i < checkioInput.length; i++){
                    if (checkioInput[i].match('[a-z]')){
                        res += "<span class='lowercase'>";
                        flag_l = true;
                    }
                    else if (checkioInput[i].match('[A-Z]')){
                        res += "<span class='uppercase'>";
                        flag_u = true;
                    }
                    else if (checkioInput[i].match('[0-9]')){
                        res += "<span class='digital'>";
                        flag_d = true;
                    }
                    else
                        res += "<span>" + checkioInput[i] + "</span> ";
                    res +=  checkioInput[i] + "</span> ";
                }
                if (i < 9)
                    for (i; i < 9; i++)
                        res += "<span>&nbsp;</span> ";
                return res;
            }();
            var password_length_html = function(){
                var res = 'length ';
                if (checkioInput.length < 10)
                    res += "< 10";
                else
                    res += " >= 10"
                return res;

            }();

            var password_include = function() {
                if (flag_l)
                    $content.find('.lower-include').addClass('vote_up');
                else
                    $content.find('.lower-include').addClass('vote_down');
                if (flag_u)
                    $content.find('.upper-include').addClass('vote_up');
                else
                    $content.find('.upper-include').addClass('vote_down');
                if (flag_d)
                    $content.find('.digital-include').addClass('vote_up');
                else
                    $content.find('.digital-include').addClass('vote_down');
            }();

            $content.find('.password-length').html(password_length_html);
            $content.find('.password-word').html(password_word_html);


            this_e.setAnimationHeight($content.height() + 60);

        });

        //TRYIT code
        var $tryit;


        //this function process returned data and show it
        ext.set_console_process_ret(function (this_e, ret) {
            try {
                ret = JSON.parse(ret);
            }
            catch (err) {
            }
            if (ret == true) {
                $tryit.find('.checkio_result').html("Good password (True)");
            }
            else if (ret == false) {
                $tryit.find('.checkio_result').html("Bad password (False)");
            }
            else {
                $tryit.find('.checkio_result').html("Checkio return " + JSON.stringify(ret));
            }
        });

        ext.set_generate_animation_panel(function (this_e) {
            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find(".tryit-content");
            $tryit.find('.password_input').focus();


            $tryit.find('form').submit(function(e){
                var password = $tryit.find('.password_input').val();
                this_e.sendToConsoleCheckiO(password);
                e.stopPropagation();
                return false;
            });

        });


        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);
