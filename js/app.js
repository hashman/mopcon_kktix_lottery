var app = angular.module('mopcon', []);
app.controller('MainCtrl', ['$scope', function MainCtrl($scope) {

    $('label[for="ready_lable"]').hide();
    $('button[id="get_result"]').hide();

    var vm = this;

    function fileChange(files) {
        XLSXReader(files[0], false, true, function (data) {
            angular.forEach(data.sheets, function(value) {
                setSheetValue(value);
            });
        });
    }

    function getResult() {
        vm.msg = '';
        var random_number = Math.floor((Math.random() * vm.sheet.length));
        var result = vm.sheet[random_number];
        if (result['Attendance Book Day1'] && result['Attendance Book Day2']) {
            if (vm.random_index.indexOf(random_number) == -1) {
                console.log('in result: ', result);
                vm.random_index.push(random_number);
                vm.register_number.push(vm.sheet[random_number].報名序號);
                vm.msg = ['票種：', result['票種'], ', 報名序號：', result['報名序號'], ', 匿稱：', result['聯絡人 慣用暱稱/ID']].join('');
            } else {
                console.log('retry');
                vm.getResult();
            }
        } else {
            console.log('retry');
            vm.getResult();
        }
    };

    function setSheetValue(value) {
        vm.sheet = value;
        $('label[for="ready_lable"]').show();
        $('button[id="get_result"]').show();
    }

    angular.extend(this, {
        sheet: [],
        msg: '',
        random_index: [],
        register_number: [],
        fileChange: fileChange,
        getResult: getResult,
    });
}]);