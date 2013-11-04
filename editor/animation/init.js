//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
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
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }
            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + ext.JSON.encode(data.in) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var checkioInput = data.in;
            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


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

            var explanationDiv = new HousePasswordDiv($content.find(".explanation"));
            explanationDiv.createDiv(checkioInput);

            this_e.setAnimationHeight($content.height() + 60);

        });


        var $tryit;

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


            $tryit.find('form').submit(function (e) {
                var password = $tryit.find('.password_input').val();
                this_e.sendToConsoleCheckiO(password);
                e.stopPropagation();
                return false;
            });

        });

        function HousePasswordDiv(root) {

            var vMark = "&#10004;";
            var xMark = "&#10008;";

            this.createDiv = function (text) {
                var flag_l = false;
                var flag_u = false;
                var flag_d = false;
                var password_word_html = '';
                for (var i = 0; i < text.length; i++) {
                    if (text[i].match('[a-z]')) {
                        password_word_html += "<span class='lowercase'>";
                        flag_l = true;
                    }
                    else if (text[i].match('[A-Z]')) {
                        password_word_html += "<span class='uppercase'>";
                        flag_u = true;
                    }
                    else if (text[i].match('[0-9]')) {
                        password_word_html += "<span class='digital'>";
                        flag_d = true;
                    }
                    else
                        password_word_html += "<span>" + text[i] + "</span> ";
                    password_word_html += text[i] + "</span> ";
                }
                if (i < 9)
                    for (i; i < 9; i++)
                        password_word_html += "<span>&nbsp;</span> ";

                var password_length_html = 'length ';
                if (text.length < 10)
                    password_length_html += "&lt; 10";
                else
                    password_length_html += " &ge; 10";

                if (flag_l)
                    root.find('.lower-include').html(vMark).addClass('vote_up');
                else
                    root.find('.lower-include').html(xMark).addClass('vote_down');
                if (flag_u)
                    root.find('.upper-include').html(vMark).addClass('vote_up');
                else
                    root.find('.upper-include').html(xMark).addClass('vote_down');
                if (flag_d)
                    root.find('.digital-include').html(vMark).addClass('vote_up');
                else
                    root.find('.digital-include').html(xMark).addClass('vote_down');

                root.find('.password-length').html(password_length_html);
                root.find('.password-word').html(password_word_html);
            }
        }


    }
);
