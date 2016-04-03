angular.module('prms.components.datePicker', [])
.directive('datePicker', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
                dateFormat: 'dd MM, yy',
                onSelect: function (date) {
                }
            });
            element.parent().append('<i class="fa fa-calendar date-picker-calender"></i>');
        }
    };
});
