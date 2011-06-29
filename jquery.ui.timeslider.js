(function ($) { 
    "use strict";
    $.widget("ui.timeslider", {
        getTime: function (value) {   
            var time = null,
                from = new Date(value * 60 * 1000),
                minutes = from.getMinutes(),
                hours = from.getHours(),
                minuteString;
            
            if (hours === 0) {
                hours = 12;
            }
        
            if (hours > 12) {
                hours = hours - 12;
                time = "PM";
            } else {
                time = "AM";   
            }
        
            if (minutes < 10) {
                minuteString = "0" + String(minutes);
            } else { 
                minuteString = String(minutes);
            }

        
            return String(hours) + ":" + minuteString + " " + time;
	
        },
        slideTime: function (event, ui) {
            var that = $(this),
                stTime = null,
                eTime = null;
            
            if (that.slider("option", "range")) {
                stTime = that.timeslider('getTime', (that.slider("values", 0)));
                eTime = that.timeslider('getTime', that.slider("values", 1));
            
                that.timeslider('option', 'startTime').val(stTime);
                that.timeslider('option', 'endTime').val(eTime);
            } else {
                stTime = that.timeslider('getTime', that.slider("value"));
    
                that.timeslider('option', 'startTime').val(stTime);
            }
        },
        checkMax: function (event, ui) {
            var that = $(this),
                div = that.find('div'),
                size = that.slider("values", 1) - that.slider("values", 0);
        
            if (that.slider("option", "range")) {
               
                if (size >= 1435) {
		            div.addClass("ui-state-error");
                    that.timeslider('option', 'submitButton').attr("disabled", "disabled").addClass("ui-state-disabled");
                    that.timeslider('option', 'errorMessage').text("Cannot be more than 24 hours");
	            } else {	
                    div.removeClass("ui-state-error");
                    that.timeslider('option', 'submitButton').attr("disabled", null).removeClass("ui-state-disabled");
                    that.timeslider('option', 'errorMessage').text("");
                } 
            }
        },
        options: {
            sliderOptions: {},
            errorMessage: null,
            startTime: null,
            endTime: null,
            submitButton: null,
            clickSubmit: null
            
        },
        create: function () {
            var that = this,
                o = that.options,
                el = that.element;
                
            o.sliderOptions.slide = that.slideTime;
            o.sliderOptions.change = that.checkMax;
            o.sliderOptions.stop = that.slideTime;
            el.slider(o.sliderOptions);
                
            o.errorMessage = $(o.errorMessage);
            o.endTime = $(o.endTime);                
            o.startTime = $(o.startTime);
            o.submitButton = $(o.submitButton).click(o.clickSubmit);
                
                
            that.slideTime.call(el);
        },
        destroy: function () {
            this.element.remove();
        }
    });
})(jQuery);
    